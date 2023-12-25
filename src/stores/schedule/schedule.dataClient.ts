import {injectable} from "inversify";
import {axios} from "src/axios";
import moment from "moment";
import {CashierInfo, Reservation} from "src/types/schedule/schedule.types";
import {DATE_FORMAT} from "src/constants/date";
import {
  ChangesResponseType,
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import {Certificate} from "src/types/shared.types";

@injectable()
export class ScheduleDataClient {
  async loadReservations(
    cinemaId: number,
    roomId: number | undefined,
    date: Date
  ): Promise<Reservation[]> {
    const response = await axios.get<Reservation[]>("/reservation", {
      params: {
        room_id: roomId,
        date: moment(date).format(DATE_FORMAT),
        cinema_id: cinemaId
      }
    });

    return response.data;
  }

  async searchReservations(
    data: ReservationSearchBodyType
  ): Promise<Reservation[]> {
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
      url += `date_to=${moment(data.end_date).format(DATE_FORMAT)}`;
    }

    const response = await axios.get<Reservation[]>(url);
    return response.data;
  }

  async loadCertificate(ident: string) {
    const response = await axios.get<Certificate>(`/certificate/${ident}`);

    return response.data;
  }

  async loadCashierInfo(cinemaId: number, date: Date): Promise<CashierInfo> {
    const response = await axios.get<CashierInfo>("/money", {
      params: {
        cinema_id: cinemaId,
        date: moment(date).format(DATE_FORMAT)
      }
    });

    return response.data;
  }

  async createReservation(data: ReservationCreationBodyType) {
    const response = await axios.post<Reservation>("/reservation", data);

    return response.data;
  }

  async editReservation(data: ReservationEditBodyType, reservationId: number) {
    const currentTime = moment().format("YYYY-MM-DD hh:mm");

    const response = await axios.put<number[]>(
      `/reservation/${reservationId}`,
      {
        data,
        currentTime
      }
    );

    return response.data;
  }

  async getChangesHistory(id: number) {
    const response = await axios.get<ChangesResponseType[]>(
      `/reservation/logs/${id}`
    );

    return response.data;
  }
}
