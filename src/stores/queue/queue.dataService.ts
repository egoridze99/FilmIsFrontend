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
      start_date: moment.utc(i.start_date),
      end_date: i.end_date ? moment.utc(i.end_date) : null,
      created_at: moment.utc(i.created_at),
      view_by: i.view_by.map((l) => ({
        ...l,
        created_at: moment.utc(l.created_at)
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
      start_date: moment.utc(i.start_date),
      end_date: i.end_date ? moment.utc(i.end_date) : null,
      created_at: moment.utc(i.created_at),
      view_by: i.view_by.map((l) => ({
        ...l,
        created_at: moment.utc(l.created_at)
      }))
    }));
  }

  async closeQueueItem(id: number) {
    return this.dataClient.closeQueueItem(id);
  }
}
