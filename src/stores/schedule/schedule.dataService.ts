import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";
import moment, {Moment} from "moment";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import {
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import {CHECKOUTS_KEY, keysDictionary} from "./helpers/changesHistoryConstants";

@injectable()
export class ScheduleDataService {
  @inject(TYPES.ScheduleDataClient)
  private readonly dataClient: ScheduleDataClient;

  async loadReservations(
    cinemaId: number,
    roomId: number | undefined,
    date: Date
  ): Promise<Reservation[]> {
    const reservations = await this.dataClient.loadReservations(
      cinemaId,
      roomId,
      date
    );
    return reservations.map((reservation) => {
      console.log(moment.utc(reservation.date));

      return {
        ...reservation,
        date: moment.utc(reservation.date),
        created_at: moment.utc(reservation.created_at)
      };
    });
  }

  async searchReservations(
    data: ReservationSearchBodyType
  ): Promise<Reservation[]> {
    const reservations = await this.dataClient.searchReservations(data);

    return reservations.map((reservation) => ({
      ...reservation,
      date: moment.utc(reservation.date),
      created_at: moment.utc(reservation.created_at)
    }));
  }

  async loadCertificate(ident: string) {
    return this.dataClient.loadCertificate(ident);
  }

  async loadCashierInfo(cinemaId: number, date: Date) {
    return (await this.dataClient.loadCashierInfo(cinemaId, date)) || null;
  }

  async createReservation(data: ReservationCreationBodyType) {
    return this.dataClient.createReservation(data);
  }

  async editReservation(data: ReservationEditBodyType, reservationId: number) {
    return this.dataClient.editReservation(data, reservationId);
  }

  async getChangesHistory(id: number): Promise<
    {
      author: string;
      created_at: Moment;
      id: number;
      data: {[key: string]: any};
    }[]
  > {
    const rawChanges = await this.dataClient.getChangesHistory(id);

    return rawChanges.map((item) => {
      const copy = {...item} as any;

      return {
        author: item.author,
        created_at: moment.utc(item.created_at),
        id: item.id,
        data: Object.keys(item.new).reduce((acc, key) => {
          let wasChanged = copy.new[key] !== copy.old[key];

          if (key === CHECKOUTS_KEY) {
            copy.new[key] =
              copy.new[key]
                .map((c: any) => `Сумма: ${c.sum}, заметка: ${c.description}`)
                .join(";    ") || "Пусто";

            copy.old[key] =
              copy.old[key]
                .map((c: any) => `Сумма: ${c.sum}, заметка: ${c.description}`)
                .join(";    ") || "Пусто";

            wasChanged = copy.new[key] !== copy.old[key];
          }

          if (key === "status") {
            copy.new.status =
              reservationStatusDictionary[
                copy.new.status as ReservationStatus
              ].title;
            copy.old.status =
              reservationStatusDictionary[
                copy.old.status as ReservationStatus
              ].title;
          }

          if (wasChanged) {
            acc[keysDictionary[key]] = {
              new: copy.new[key],
              old: copy.old[key]
            };
          }

          return acc;
        }, {})
      };
    });
  }
}
