import {injectable} from "inversify";
import {axios} from "src/axios";
import moment from "moment";
import {CashierInfo, Reservation} from "src/types/schedule/schedule.types";
import {DATE_FORMAT} from "src/constants/date";

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
}
