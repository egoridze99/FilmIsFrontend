import {DateTimeType, Room} from "src/types/shared.types";
import {
  ChangesItemType,
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";

export type ReservationResponseType = Omit<
  Reservation,
  "date" | "created_at"
> & {date: DateTimeType; created_at: DateTimeType};

export type ReservationCreationBodyType = {
  room: Room;
  date: string;
  time: string;
  duration: number;
  count: number;
  guest: {
    name: string;
    tel: string;
  };
  film: string | null;
  rent: number | null;
  note: string | null;
  certificate_ident: string | null;
};

export type ReservationEditBodyType = ReservationCreationBodyType & {
  card: number;
  cash: number;
  status: ReservationStatus;
  checkouts: {note: string; sum: number; id?: number}[];
};

export type ReservationSearchBodyType = {
  statuses: ReservationStatus[];
  rooms: number[];
  reservation_id: string | null;
  telephone: string | null;
  start_date: DateTimeType | null;
  end_date: DateTimeType | null;
};

export type ChangesResponseType = {
  author: string;
  created_at: DateTimeType;
  id: number;
  new: ChangesItemType;
  old: ChangesItemType;
};
