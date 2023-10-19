import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";

@injectable()
export class ScheduleDataService {
  @inject(TYPES.ScheduleDataClient)
  private readonly dataClient: ScheduleDataClient;
}
