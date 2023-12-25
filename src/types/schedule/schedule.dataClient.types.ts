import {Room} from "src/types/shared.types";
import {
  ChangesItemType,
  ReservationStatus
} from "src/types/schedule/schedule.types";

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
  start_date: Date | null;
  end_date: Date | null;
};

export type ChangesResponseType = {
  author: string;
  created_at: string;
  id: number;
  new: ChangesItemType;
  old: ChangesItemType;
};
