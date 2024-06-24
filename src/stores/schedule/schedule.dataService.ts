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
import {DATETIME_FORMAT} from "../../constants/date";
import {applyCustomerAdapter} from "src/utils/customer/applyCustomerAdapter";
import {TransactionCreationType} from "src/types/transactions/transactions.types";
import {axios} from "src/axios";

@injectable()
export class ScheduleDataService {
  @inject(TYPES.ScheduleDataClient)
  private readonly dataClient: ScheduleDataClient;

  async loadReservations(
    cinemaId: number,
    roomId: number | undefined,
    date: Moment
  ): Promise<Reservation[]> {
    const reservations = await this.dataClient.loadReservations(
      cinemaId,
      roomId,
      date
    );
    return reservations.map((reservation) => {
      return {
        ...reservation,
        date: moment(reservation.date, DATETIME_FORMAT),
        created_at: moment(reservation.created_at, DATETIME_FORMAT),
        guest: applyCustomerAdapter(reservation.guest)
      };
    });
  }

  async getReservation(id: number) {
    const reservation = await this.dataClient.getReservation(id);

    return {
      ...reservation,
      date: moment(reservation.date, DATETIME_FORMAT),
      created_at: moment(reservation.created_at, DATETIME_FORMAT),
      guest: applyCustomerAdapter(reservation.guest)
    };
  }

  async searchReservations(
    data: ReservationSearchBodyType
  ): Promise<Reservation[]> {
    const reservations = await this.dataClient.searchReservations(data);

    return reservations.map((reservation) => ({
      ...reservation,
      date: moment(reservation.date, DATETIME_FORMAT),
      created_at: moment(reservation.created_at, DATETIME_FORMAT),
      guest: applyCustomerAdapter(reservation.guest)
    }));
  }

  async loadCertificate(ident: string) {
    return this.dataClient.loadCertificate(ident);
  }

  async createReservation(data: ReservationCreationBodyType) {
    return this.dataClient.createReservation(data);
  }

  async loadReservationTransactions(reservationId: number) {
    return this.dataClient.loadReservationTransactions(reservationId);
  }

  createReservationTransaction(
    data: TransactionCreationType,
    reservationId: number
  ) {
    return this.dataClient.createTransaction(data, reservationId);
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
        created_at: moment(item.created_at, DATETIME_FORMAT),
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
