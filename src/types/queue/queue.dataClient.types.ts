import {Moment} from "moment/moment";
import {QueueItemStatusEnum} from "src/types/shared.types";

export type QueueCreationBodyType = {
  contact: string;
  date: string;
  duration: number;
  end_time: string | null;
  guests_count: number;
  has_another_reservation: boolean;
  note: string | null;
  rooms: number[];
  start_time: string | null;
  telephone: string | null;
};

export type QueueEditBodyType = QueueCreationBodyType & {
  status: QueueItemStatusEnum;
};
