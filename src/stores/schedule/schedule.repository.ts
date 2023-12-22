import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {ScheduleDataService} from "src/stores/schedule/schedule.dataService";
import {computed} from "mobx";
import {Reservation} from "src/types/schedule/schedule.types";
import {sortBy} from "ramda";
import moment from "moment";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType
} from "src/types/schedule/schedule.dataClient.types";
import {INotificationService} from "src/services/types/notification.interface";
import {commonErrorText} from "src/constants/notifications";

@injectable()
export class ScheduleRepository {
  @inject(TYPES.ScheduleDataService)
  private readonly dataService: ScheduleDataService;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @computed
  get reservations(): Reservation[] {
    return sortBy(
      (reservation) =>
        moment(
          `${reservation.date} ${reservation.time}`,
          "DD-MM-YYYY hh:mm"
        ).toDate(),
      this.dataService.dataStorage.reservations
    );
  }

  @computed
  get cashierInfo() {
    return this.dataService.dataStorage.cashierInfo;
  }

  async loadCertificate(ident: string) {
    try {
      return await this.dataService.loadCertificate(ident);
    } catch (e) {
      this.notificationService.addNotification({
        kind: "error",
        title: "Произошла ошибка при загрузке сертификата",
        message: e?.response?.data?.msg || commonErrorText
      });

      return null;
    }
  }

  async createReservation(data: ReservationCreationBodyType): Promise<boolean> {
    try {
      await this.dataService.createReservation(data);
      this.notificationService.addNotification({
        kind: "success",
        title: "Резерв успешно создан"
      });

      return true;
    } catch (e) {
      this.notificationService.addNotification({
        kind: "error",
        title: "Произошла ошибка",
        message: e?.response?.data?.msg || commonErrorText
      });
      return false;
    }
  }

  async editReservation(data: ReservationEditBodyType, reservationId: number) {
    try {
      const availableItemsFromQueue = await this.dataService.editReservation(
        data,
        reservationId
      );
      this.notificationService.addNotification({
        kind: "success",
        title: "Резерв успешно отредактирован"
      });

      return true;
    } catch (e) {
      this.notificationService.addNotification({
        kind: "error",
        title: "Произошла ошибка",
        message: e?.response?.data?.msg || commonErrorText
      });
      return false;
    }
  }

  loadData(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    this.dataService.loadReservations(env.cinema.id, env.room?.id, env.date);
  }

  loadCashierInfo(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    this.dataService.loadCashierInfo(env.cinema.id, env.date);
  }

  reset() {
    this.dataService.dataStorage.reset();
  }
}
