import {injectable} from "inversify";
import {axios} from "src/axios";
import {QueueItem} from "src/types/shared.types";
import moment from "moment/moment";
import {DATE_FORMAT} from "src/constants/date";

@injectable()
export class QueueDataClient {
  async loadQueue(cinemaId: number, roomId: number | undefined, date: Date) {
    const response = await axios.get<QueueItem[]>("/queue", {
      params: {
        cinema_id: cinemaId,
        room_id: roomId,
        date: moment(date).format(DATE_FORMAT)
      }
    });

    return response.data;
  }
}
