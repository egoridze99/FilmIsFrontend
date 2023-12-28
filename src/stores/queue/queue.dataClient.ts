import {injectable} from "inversify";
import {axios} from "src/axios";
import {QueueItem} from "src/types/shared.types";
import moment from "moment/moment";
import {DATE_FORMAT} from "src/constants/date";
import {
  QueueCreationBodyType,
  QueueEditBodyType
} from "src/types/queue/queue.dataClient.types";

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

  async createQueueItem(data: QueueCreationBodyType) {
    const response = await axios.post("/queue", data);

    return response.data;
  }

  async editQueueItem(data: QueueEditBodyType, id: number) {
    const response = await axios.put<QueueItem>(`/queue/${id}`, data);

    return response.data;
  }
}
