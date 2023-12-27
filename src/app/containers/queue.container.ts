import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {QueueDataClient} from "src/stores/queue/queue.dataClient";
import {QueueDataService} from "src/stores/queue/queue.dataService";
import {QueueRepository} from "src/stores/queue/queue.repository";

export class QueueContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.QueueDataClient).to(QueueDataClient);
    this.bind(TYPES.QueueDataService).to(QueueDataService);
    this.bind(TYPES.QueueRepository).to(QueueRepository);
  }
}
