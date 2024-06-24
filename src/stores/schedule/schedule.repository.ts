import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {ScheduleDataService} from "src/stores/schedule/schedule.dataService";
import {action, computed, makeObservable, observable} from "mobx";
import {Reservation} from "src/types/schedule/schedule.types";
import {sortBy} from "ramda";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import {
  INotificationService,
  NotificationType
} from "src/services/types/notification.interface";
import React from "react";
import AvailableQueueItemsNotification from "src/UI/components/AvailableQueueItemsNotification";
import {IStorage} from "src/services/types/storage.interface";
import {INavigationService} from "src/services/types/navigation.interface";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {QUEUE_IDS_TO_SEARCH} from "src/constants/storageKeys";
import {CustomerService} from "src/services/customer.service";
import {Customer} from "src/types/customer.types";
import {updateCustomerDataInCollection} from "src/utils/updateCustomerDataInCollection";
import {TransactionCreationType} from "src/types/transactions/transactions.types";

@injectable()
export class ScheduleRepository {
  @observable
  private _reservations: Reservation[] = [];

  @observable isLoading = false;

  @inject(TYPES.CustomerService)
  private readonly customerService: CustomerService;

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
      (reservation) => reservation.date.toDate(),
      this._reservations
    );
  }

  @action
  async searchReservations(data: ReservationSearchBodyType): Promise<boolean> {
    try {
      this.isLoading = true;
      this._reservations = await this.dataService.searchReservations(data);
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
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
          id: "AVAILABLE_QUEUE_ITEMS",
          kind: "warn",
          title: "Есть доступные элементы в очереди",
          message: null,
          timeout: 15 * 1000
        };
        const redirectToQueueTab = (ids: number[]) => {
          this.notificationService.removeNotification(notification);
          this.sessionStorageService.setItem(
            QUEUE_IDS_TO_SEARCH,
            ids.join(" ")
          );
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

  async loadReservationTransactions(reservationId: number) {
    return this.dataService.loadReservationTransactions(reservationId);
  }

  createReservationTransaction(
    data: TransactionCreationType,
    reservationId: number
  ) {
    return this.dataService.createReservationTransaction(data, reservationId);
  }

  createReactions() {
    this.customerService.onCustomerUpdate(this.updateCustomerOnReservation);
  }

  @action
  async loadData(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    try {
      this.isLoading = true;
      this._reservations = await this.dataService.loadReservations(
        env.cinema.id,
        env.room?.id,
        env.date
      );
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async getReservation(id: number) {
    try {
      this.isLoading = true;
      const reservations = this._reservations.filter((r) => r.id !== id);
      const updatedReservation = await this.dataService.getReservation(id);

      this._reservations = [...reservations, updatedReservation];
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  reset() {
    this._reservations = [];
    this.customerService.unsubscribe(this.updateCustomerOnReservation);
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }

  @action.bound
  private updateCustomerOnReservation(customer: Customer) {
    const updatedData = updateCustomerDataInCollection(
      this._reservations,
      "guest",
      customer
    );

    if (updatedData) {
      this._reservations = updatedData;
    }
  }
}
