import {inject, injectable} from "inversify";
import {action, computed, makeObservable, observable} from "mobx";
import {QueueItem} from "src/types/shared.types";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {TYPES} from "src/app/app.types";
import {QueueDataService} from "src/stores/queue/queue.dataService";
import {INotificationService} from "src/services/types/notification.interface";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {sortWith} from "ramda";
import {
  QueueCreationBodyType,
  QueueEditBodyType,
  QueueSearchBodyType
} from "src/types/queue/queue.dataClient.types";
import {Customer} from "src/types/customer.types";
import {updateCustomerDataInCollection} from "src/utils/updateCustomerDataInCollection";
import {CustomerService} from "src/services/customer.service";

@injectable()
export class QueueRepository {
  @inject(TYPES.QueueDataService)
  private readonly dataService: QueueDataService;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @inject(TYPES.CustomerService)
  private readonly customerService: CustomerService;

  @observable isLoading: boolean = false;

  @observable
  _queue: QueueItem[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed get queue() {
    return sortWith(
      [
        (a: QueueItem, b: QueueItem) => {
          if (a.start_date.isSame(b.start_date)) {
            return 0;
          }
          return b.start_date.isAfter(a.start_date) ? -1 : 1;
        }
      ],
      this._queue
    );
  }

  async createQueueItem(data: QueueCreationBodyType) {
    try {
      this.isLoading = true;
      await this.dataService.createQueueItem(data);
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async editQueueItem(data: QueueEditBodyType, id: number) {
    try {
      this.isLoading = true;
      await this.dataService.editQueueItem(data, id);
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async closeQueueItem(id: number) {
    try {
      this.isLoading = true;
      await this.dataService.closeQueueItem(id);
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async searchQueueItems(data: QueueSearchBodyType): Promise<boolean> {
    try {
      this.isLoading = true;
      this._queue = await this.dataService.searchQueueItems(data);
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  initialize() {
    this.customerService.onCustomerUpdate(this.updateCustomerOnQueue);
  }

  @action
  async loadData(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    try {
      this.isLoading = true;
      this._queue = await this.dataService.loadQueue(env);
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action reset() {
    this._queue = [];
    this.customerService.unsubscribe(this.updateCustomerOnQueue);
    this.isLoading = false;
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }

  @action.bound
  private updateCustomerOnQueue(customer: Customer) {
    const updatedData = updateCustomerDataInCollection(
      this._queue,
      "contact",
      customer
    );

    if (updatedData) {
      this._queue = updatedData;
    }
  }
}
