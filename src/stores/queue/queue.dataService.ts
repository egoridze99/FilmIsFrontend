import {inject, injectable} from "inversify";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {TYPES} from "src/app/app.types";
import {QueueDataClient} from "src/stores/queue/queue.dataClient";
import moment from "moment";
import {
  QueueCreationBodyType,
  QueueEditBodyType,
  QueueSearchBodyType
} from "src/types/queue/queue.dataClient.types";
import {QueueItem} from "src/types/shared.types";
import {DATETIME_FORMAT} from "../../constants/date";
import {applyCustomerAdapter} from "src/utils/customer/applyCustomerAdapter";

@injectable()
export class QueueDataService {
  @inject(TYPES.QueueDataClient)
  private readonly dataClient: QueueDataClient;

  async loadQueue(env: WorkspaceEnvModel): Promise<QueueItem[]> {
    const queue = await this.dataClient.loadQueue(
      env.cinema.id,
      env.room?.id,
      env.date
    );

    return queue.map((i) => ({
      ...i,
      contact: applyCustomerAdapter(i.contact),
      start_date: moment(i.start_date, DATETIME_FORMAT),
      end_date: i.end_date ? moment(i.end_date, DATETIME_FORMAT) : null,
      created_at: moment(i.created_at, DATETIME_FORMAT),
      view_by: i.view_by.map((l) => ({
        ...l,
        created_at: moment(l.created_at, DATETIME_FORMAT)
      }))
    }));
  }

  async createQueueItem(data: QueueCreationBodyType) {
    return this.dataClient.createQueueItem(data);
  }

  async editQueueItem(data: QueueEditBodyType, id: number) {
    return this.dataClient.editQueueItem(data, id);
  }

  async searchQueueItems(data: QueueSearchBodyType): Promise<QueueItem[]> {
    const queue = await this.dataClient.searchQueueItems(data);

    return queue.map((i) => ({
      ...i,
      contact: applyCustomerAdapter(i.contact),
      start_date: moment(i.start_date, DATETIME_FORMAT),
      end_date: i.end_date ? moment(i.end_date, DATETIME_FORMAT) : null,
      created_at: moment(i.created_at, DATETIME_FORMAT),
      view_by: i.view_by.map((l) => ({
        ...l,
        created_at: moment(l.created_at, DATETIME_FORMAT)
      }))
    }));
  }

  async closeQueueItem(id: number) {
    return this.dataClient.closeQueueItem(id);
  }
}
