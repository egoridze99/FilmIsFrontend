import {Certificate, Room, UserStatus} from "src/types/shared.types";

export type Reservation = {
  id: number;

  date: string;
  time: string;
  duration: number;

  count: number; // Кол-во человек
  room: Room;
  guest: {
    name: string;
    tel: string;
  };

  film: string;
  note: string;
  author: {
    fullname: string;
    status: UserStatus;
  };
  status: ReservationStatus;

  card: number;
  cash: number;
  rent: number;
  certificate: Certificate | null;

  created_at: string;
  checkouts: CheckoutType[];
};

export type CheckoutType = {
  id: number | undefined;
  sum: number;
  note: string;
};

export enum ReservationStatus {
  not_allowed = "not_allowed",
  progress = "progress",
  waiting = "waiting",
  finished = "finished",
  canceled = "canceled"
}
