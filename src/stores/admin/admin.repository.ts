import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {AnalyticType, UserCreationBodyType} from "src/types/admin/admin.types";
import {UserInfo} from "src/types/shared.types";
import {TYPES} from "src/app/app.types";
import {AdminDataClient} from "src/stores/admin/admin.dataClient";
import fileSaver from "file-saver";
import {INotificationService} from "src/services/types/notification.interface";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {Roles} from "src/types/core.types";

@injectable()
export class AdminRepository {
  @inject(TYPES.AdminDataClient)
  private readonly dataClient: AdminDataClient;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @observable
  isLoading: boolean = false;

  @observable
  analyticData: AnalyticType | null = null;

  @observable
  users: UserInfo[] = [];

  constructor() {
    makeObservable(this);
  }

  async getTelephones() {
    const data = await this.dataClient.getTelephones();
    const dataAsString = data.join("\n");
    fileSaver.saveAs(
      new Blob([dataAsString], {type: "text/plain;charset=utf-8"}),
      "telephones.txt"
    );
  }

  @action
  async getAnalyticData(
    dateFrom: string,
    dateTo: string,
    area: "cinema" | "room"
  ) {
    try {
      this.isLoading = true;
      this.analyticData = await this.dataClient.getAnalyticData(
        dateFrom,
        dateTo,
        area
      );
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  clearAnalyticData() {
    this.analyticData = null;
  }

  @action
  async getUsers() {
    this.isLoading = true;
    try {
      this.users = await this.dataClient.getUsers();
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  clearUsers() {
    this.users = [];
  }

  @action
  async removeUser(id: number) {
    this.isLoading = true;
    try {
      await this.dataClient.removeUser(id);
      this.notificationService.addNotification({
        kind: "success",
        title: "Успешно",
        message: "Пользователь успешно удален"
      });
      this.users = this.users.filter((u) => u.id !== id);
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async createNewUser(data: UserCreationBodyType) {
    try {
      this.isLoading = true;
      await this.dataClient.createNewUser(data);
      this.notificationService.addNotification({
        kind: "success",
        title: "Успешно",
        message: "Пользователь успешно создан"
      });
      return true;
    } catch (e) {
      console.log(e);
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }
}
