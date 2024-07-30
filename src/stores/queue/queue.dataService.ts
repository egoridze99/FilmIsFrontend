import {inject, injectable} from "inversify";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {TYPES} from "src/app/app.types";
import {QueueDataClient} from "src/stores/queue/queue.dataClient";
import {
  QueueCreationBodyType,
  QueueEditBodyType,
  QueueSearchBodyType
} from "src/types/queue/queue.dataClient.types";
import {QueueItem} from "src/types/shared.types";
import {CustomerService} from "src/services/customer.service";
import {applyQueueAdapter} from "src/stores/queue/applyQueueAdapter";

@injectable()
export class QueueDataService {
  @inject(TYPES.QueueDataClient)
  private readonly dataClient: QueueDataClient;

  @inject(TYPES.CustomerService)
  private readonly customerService: CustomerService;

  async loadQueue(env: WorkspaceEnvModel): Promise<QueueItem[]> {
    const queue = await this.dataClient.loadQueue(
      env.cinema.id,
      env.room?.id,
      env.date
    );

    const customersIds = queue.map((r) => r.contact_id);
    const customers = await this.customerService.getCustomersById(
      customersIds,
      "dict"
    );

    return queue.map((i) => applyQueueAdapter(i, customers[i.contact_id]));
  }

  async createQueueItem(data: QueueCreationBodyType) {
    return this.dataClient.createQueueItem(data);
  }

  async editQueueItem(data: QueueEditBodyType, id: number) {
    return this.dataClient.editQueueItem(data, id);
  }

  async searchQueueItems(data: QueueSearchBodyType): Promise<QueueItem[]> {
    const queue = await this.dataClient.searchQueueItems(data);

    const customersIds = queue.map((r) => r.contact_id);
    const customers = await this.customerService.getCustomersById(
      customersIds,
      "dict"
    );

    return queue.map((i) => applyQueueAdapter(i, customers[i.contact_id]));
  }

  async closeQueueItem(id: number) {
    return this.dataClient.closeQueueItem(id);
  }
}
