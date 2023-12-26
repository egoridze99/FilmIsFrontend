import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";
import {ScheduleDataService} from "src/stores/schedule/schedule.dataService";
import {ScheduleRepository} from "src/stores/schedule/schedule.repository";

export class ScheduleContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.ScheduleDataClient).to(ScheduleDataClient);
    this.bind(TYPES.ScheduleDataService).to(ScheduleDataService);
    this.bind(TYPES.ScheduleRepository).to(ScheduleRepository);
  }
}
