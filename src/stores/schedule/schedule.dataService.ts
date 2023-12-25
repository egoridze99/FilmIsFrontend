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
import {ReservationStatus} from "src/types/schedule/schedule.types";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import {CHECKOUTS_KEY, keysDictionary} from "./helpers/changesHistoryConstants";

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

  async getChangesHistory(id: number): Promise<
    {
      author: string;
      created_at: string;
      id: number;
      data: {[key: string]: any};
    }[]
  > {
    const rawChanges = await this.dataClient.getChangesHistory(id);

    return rawChanges.map((item) => {
      const copy = {...item} as any;

      return {
        author: item.author,
        created_at: item.created_at,
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
