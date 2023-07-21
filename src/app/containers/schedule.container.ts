import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";

export class ScheduleContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind<ScheduleDataClient>(TYPES.ScheduleDataClient).to(
      ScheduleDataClient
    );
  }
}
