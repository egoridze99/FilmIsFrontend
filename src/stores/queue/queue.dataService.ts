import {inject, injectable} from "inversify";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {TYPES} from "src/app/app.types";
import {QueueDataClient} from "src/stores/queue/queue.dataClient";
import moment from "moment";
import {
  QueueCreationBodyType,
  QueueEditBodyType
} from "src/types/queue/queue.dataClient.types";

@injectable()
export class QueueDataService {
  @inject(TYPES.QueueDataClient)
  private readonly dataClient: QueueDataClient;

  async loadQueue(env: WorkspaceEnvModel) {
    const queue = await this.dataClient.loadQueue(
      env.cinema.id,
      env.room?.id,
      env.date
    );

    return queue.map((i) => ({
      ...i,
      date: moment(new Date(i.date)).format("DD-MM-YYYY"),
      created_at: i.created_at.split(" ")[0]
    }));
  }

  async createQueueItem(data: QueueCreationBodyType) {
    return this.dataClient.createQueueItem(data);
  }

  async editQueueItem(data: QueueEditBodyType, id: number) {
    return this.dataClient.editQueueItem(data, id);
  }

  async closeQueueItem(id: number) {
    return this.dataClient.closeQueueItem(id);
  }
}
