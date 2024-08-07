import {
  DateTimeType,
  QueueItem,
  QueueItemStatusEnum,
  QueueViewLog
} from "src/types/shared.types";

export type QueueItemResponseType = Omit<
  QueueItem,
  "created_at" | "start_date" | "end_date" | "view_by" | "contact"
> & {
  created_at: DateTimeType;
  start_date: DateTimeType;
  end_date: DateTimeType | null;
  view_by: Array<Omit<QueueViewLog, "created_at"> & {created_at: DateTimeType}>;
  contact_id: number;
};

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

export type QueueSearchBodyType = {
  status: string[] | null;
  room: number[] | null;
  ids: string | null;
  telephones: string | null;
  start_date: string | null;
  end_date: string | null;
  has_another_reservation: boolean[];
};
