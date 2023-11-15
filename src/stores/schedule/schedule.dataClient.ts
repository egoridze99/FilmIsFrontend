import {injectable} from "inversify";
import {axios} from "src/axios";
import moment from "moment";

@injectable()
export class ScheduleDataClient {
  async loadReservations(
    cinemaId: number,
    roomId: number | undefined,
    date: Date
  ) {
    const response = await axios.get("/reservation", {
      params: {
        room_id: roomId,
        date: moment(date).format("YYYY-MM-DD"),
        cinema_id: cinemaId
      }
    });

    console.log(response.data);
  }
}
