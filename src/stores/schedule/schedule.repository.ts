import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {ScheduleDataService} from "src/stores/schedule/schedule.dataService";
import {action, computed, makeObservable, observable} from "mobx";
import {CashierInfo, Reservation} from "src/types/schedule/schedule.types";
import {sortBy} from "ramda";
import moment from "moment";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import {
  INotificationService,
  NotificationType
} from "src/services/types/notification.interface";
import {commonErrorText} from "src/constants/notifications";
import React from "react";
import AvailableQueueItemsNotification from "src/UI/components/AvailableQueueItemsNotification";
import {IStorage} from "src/services/types/storage.interface";
import {INavigationService} from "src/services/types/navigation.interface";
import {ROUTER_PATHS} from "src/constants/routerPaths";

@injectable()
export class ScheduleRepository {
  @observable
  private _reservations: Reservation[] = [];

  @observable
  cashierInfo: CashierInfo | null = null;

  @inject(TYPES.ScheduleDataService)
  private readonly dataService: ScheduleDataService;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @inject(TYPES.SessionStorageService)
  private readonly sessionStorageService: IStorage;

  @inject(TYPES.NavigationService)
  private readonly navigationService: INavigationService;

  constructor() {
    makeObservable(this);
  }

  @computed
  get reservations(): Reservation[] {
    return sortBy(
      (reservation) =>
        moment(
          `${reservation.date} ${reservation.time}`,
          "DD-MM-YYYY hh:mm"
        ).toDate(),
      this._reservations
    );
  }

  async searchReservations(data: ReservationSearchBodyType): Promise<boolean> {
    try {
      this._reservations = await this.dataService.searchReservations(data);
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    }
  }

  async loadCertificate(ident: string) {
    try {
      return await this.dataService.loadCertificate(ident);
    } catch (e) {
      this.showErrorNotification(e);
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
      this.showErrorNotification(e);
      return false;
    }
  }

  async editReservation(data: ReservationEditBodyType, reservationId: number) {
    try {
      const availableItemsFromQueue = await this.dataService.editReservation(
        data,
        reservationId
      );

      if (availableItemsFromQueue.length) {
        const notification: NotificationType = {
          kind: "warn",
          title: "Есть доступные элементы в очереди",
          message: null,
          timeout: 15 * 1000
        };
        const redirectToQueueTab = (ids: number[]) => {
          this.notificationService.removeNotification(notification);
          this.sessionStorageService.setItem("", "");
          this.navigationService.navigate(ROUTER_PATHS.workspaceQueue);
        };

        redirectToQueueTab.bind(this);

        notification.message = React.createElement(
          AvailableQueueItemsNotification,
          {
            queueItemsIds: availableItemsFromQueue,
            redirectToQueueTab
          }
        );
        this.notificationService.addNotification(notification);
      } else {
        this.notificationService.addNotification({
          kind: "success",
          title: "Резерв успешно отредактирован"
        });
      }

      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    }
  }

  async loadChangesHistory(reservationId: number) {
    return this.dataService.getChangesHistory(reservationId);
  }

  @action
  async loadData(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    this._reservations = await this.dataService.loadReservations(
      env.cinema.id,
      env.room?.id,
      env.date
    );
  }

  @action
  async loadCashierInfo(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    this.cashierInfo = await this.dataService.loadCashierInfo(
      env.cinema.id,
      env.date
    );
  }

  @action
  reset() {
    this.cashierInfo = null;
    this._reservations = [];
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification({
      kind: "error",
      title: "Произошла ошибка",
      message: e?.response?.data?.msg || commonErrorText
    });
  }
}
