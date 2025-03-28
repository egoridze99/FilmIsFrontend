import {inject, injectable} from "inversify";
import {axios} from "src/axios";
import moment, {Moment} from "moment";
import {Reservation} from "src/types/schedule/schedule.types";
import {DATE_FORMAT} from "src/constants/date";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationResponseType,
  ReservationSearchBodyType,
  ScheduleChangesResponseType
} from "src/types/schedule/schedule.dataClient.types";
import {Certificate} from "src/types/shared.types";
import {TYPES} from "src/app/app.types";
import {TransactionService} from "src/services/transaction.service";
import {TransactionCreationType} from "src/types/transactions/transactions.types";

@injectable()
export class ScheduleDataClient {
  @inject(TYPES.TransactionService)
  private readonly transactionService: TransactionService;

  async loadReservations(
    cinemaId: number,
    roomId: number | undefined,
    date: Moment
  ): Promise<ReservationResponseType[]> {
    const response = await axios.get<ReservationResponseType[]>(
      "/reservation",
      {
        params: {
          room_id: roomId,
          date: date.format(DATE_FORMAT),
          cinema_id: cinemaId
        }
      }
    );

    return response.data;
  }

  async searchReservations(
    data: ReservationSearchBodyType
  ): Promise<ReservationResponseType[]> {
    let url = `/reservation/search?`;
    const reservationIds = data.reservation_id
      ? data.reservation_id.split(" ")
      : [];
    const telephones = data.telephone ? data.telephone.split(" ") : [];

    if (data.statuses.length) {
      url += `status=${JSON.stringify(data.statuses)}&`;
    }

    if (data.rooms.length) {
      url += `room=${JSON.stringify(data.rooms)}&`;
    }

    if (reservationIds.length) {
      url += `ids=${JSON.stringify(reservationIds)}&`;
    }

    if (telephones.length) {
      url += `telephones=${JSON.stringify(telephones)}&`;
    }

    if (data.start_date) {
      url += `date_from=${moment(data.start_date).format(DATE_FORMAT)}&`;
    }

    if (data.end_date) {
      url += `date_to=${moment(data.end_date).format(DATE_FORMAT)}&`;
    }

    if (data.created_start_date) {
      url += `created_start_date=${moment(data.created_start_date).format(DATE_FORMAT)}&`;
    }

    if (data.created_end_date) {
      url += `created_end_date=${moment(data.created_end_date).format(DATE_FORMAT)}&`;
    }

    const response = await axios.get<ReservationResponseType[]>(url);
    return response.data;
  }

  async loadCertificate(ident: string) {
    const response = await axios.get<Certificate>(`/certificate/${ident}`);

    return response.data;
  }

  async createReservation(data: ReservationCreationBodyType) {
    const response = await axios.post<Reservation>("/reservation", data);

    return response.data;
  }

  async getReservation(id: number) {
    const response = await axios.get<ReservationResponseType>(
      `/reservation/${id}`
    );

    return response.data;
  }

  async editReservation(data: ReservationEditBodyType, reservationId: number) {
    const response = await axios.put<number[]>(
      `/reservation/${reservationId}`,
      data
    );

    return response.data;
  }

  async getChangesHistory(id: number) {
    const response = await axios.get<ScheduleChangesResponseType[]>(
      `/reservation/logs/${id}`
    );

    return response.data;
  }

  loadReservationTransactions(reservationId: number) {
    return this.transactionService.loadReservationTransactions(reservationId);
  }

  createTransaction(data: TransactionCreationType, reservationId: number) {
    return this.transactionService.createTransaction(data, {
      reservation_id: reservationId
    });
  }
}
