import {injectable} from "inversify";
import {axios} from "src/axios";
import moment from "moment";
import {CashierInfo, Reservation} from "src/types/schedule/schedule.types";
import {DATE_FORMAT} from "src/constants/date";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType
} from "src/types/schedule/schedule.dataClient.types";

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
}
