import {injectable} from "inversify";
import {axios} from "src/axios";
import {QueueItem} from "src/types/shared.types";
import moment from "moment/moment";
import {DATE_FORMAT} from "src/constants/date";
import {
  QueueCreationBodyType,
  QueueEditBodyType,
  QueueItemResponseType,
  QueueSearchBodyType
} from "src/types/queue/queue.dataClient.types";

@injectable()
export class QueueDataClient {
  async loadQueue(cinemaId: number, roomId: number | undefined, date: Date) {
    const response = await axios.get<QueueItemResponseType[]>("/queue", {
      params: {
        cinema_id: cinemaId,
        room_id: roomId,
        date: moment.utc(date).format(DATE_FORMAT)
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

  async closeQueueItem(id: number) {
    await axios.put(`/queue/close/${id}`);
    return true;
  }

  async searchQueueItems(
    data: QueueSearchBodyType
  ): Promise<QueueItemResponseType[]> {
    let url = `/queue/search?`;

    if (data.status?.length) {
      url += `status=${JSON.stringify(data.status)}&`;
    }

    if (data.room?.length) {
      url += `room=${JSON.stringify(data.room)}&`;
    }

    if (data.ids) {
      url += `ids=${JSON.stringify(data.ids.split(" "))}&`;
    }

    if (data.telephones) {
      url += `telephones=${JSON.stringify(data.telephones.split(" "))}&`;
    }

    if (data.start_date) {
      url += `start_date=${data.start_date}&`;
    }

    if (data.end_date) {
      url += `end_date=${data.end_date}&`;
    }

    if (data.has_another_reservation.length) {
      url += `has_another_reservation=${JSON.stringify(
        data.has_another_reservation
      )}`;
    }

    const response = await axios.get<QueueItemResponseType[]>(url);

    return response.data;
  }
}
