import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";
import {ScheduleDataStorage} from "src/stores/schedule/schedule.dataStorage";
import moment from "moment";

@injectable()
export class ScheduleDataService {
  @inject(TYPES.ScheduleDataClient)
  private readonly dataClient: ScheduleDataClient;

  @inject(TYPES.ScheduleDataStorage)
  readonly dataStorage: ScheduleDataStorage;

  async loadReservations(
    cinemaId: number,
    roomId: number | undefined,
    date: Date
  ) {
    const reservations = await this.dataClient.loadReservations(
      cinemaId,
      roomId,
      date
    );
    this.dataStorage.setReservations(
      reservations.map((reservation) => ({
        ...reservation,
        date: moment(new Date(reservation.date)).format("DD-MM-YYYY")
      }))
    );
  }
}
