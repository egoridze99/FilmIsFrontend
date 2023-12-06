import {injectable} from "inversify";
import {axios} from "src/axios";
import moment from "moment";
import {Reservation} from "src/types/shared.types";

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
        date: moment(date).format("YYYY-MM-DD"),
        cinema_id: cinemaId
      }
    });

    return response.data;
  }
}
