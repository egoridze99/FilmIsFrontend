import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";
import {ScheduleDataStorage} from "src/stores/schedule/schedule.dataStorage";
import moment from "moment";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import {Reservation} from "src/types/schedule/schedule.types";

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

  async searchReservations(data: ReservationSearchBodyType): Promise<void> {
    const reservations = await this.dataClient.searchReservations(data);

    this.dataStorage.setReservations(
      reservations.map((reservation) => ({
        ...reservation,
        date: moment(new Date(reservation.date)).format("DD-MM-YYYY")
      }))
    );
  }

  async loadCertificate(ident: string) {
    return this.dataClient.loadCertificate(ident);
  }

  async loadCashierInfo(cinemaId: number, date: Date) {
    this.dataStorage.setCashierInfo(
      (await this.dataClient.loadCashierInfo(cinemaId, date)) || null
    );
  }

  async createReservation(data: ReservationCreationBodyType) {
    return this.dataClient.createReservation(data);
  }

  async editReservation(data: ReservationEditBodyType, reservationId: number) {
    return this.dataClient.editReservation(data, reservationId);
  }
}
