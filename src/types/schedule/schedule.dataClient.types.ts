import {DateTimeType, Room} from "src/types/shared.types";
import {
  ChangesItemType,
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import {ChangesResponseType} from "src/types/core.types";

export type ReservationResponseType = Omit<
  Reservation,
  "date" | "created_at" | "guest"
> & {date: DateTimeType; created_at: DateTimeType; guest_id: number};

export type ReservationCreationBodyType = {
  room: Room;
  date: string;
  time: string;
  duration: number;
  count: number;
  guest: number;
  film: string | null;
  rent: number | null;
  note: string | null;
  certificate_ident: string | null;
};

export type ReservationEditBodyType = ReservationCreationBodyType & {
  card: number;
  cash: number;
  status: ReservationStatus;
};

export type ReservationSearchBodyType = {
  statuses: ReservationStatus[];
  rooms: number[];
  reservation_id: string | null;
  telephone: string | null;
  start_date: DateTimeType | null;
  end_date: DateTimeType | null;
};

export type ScheduleChangesResponseType = ChangesResponseType<ChangesItemType>;
