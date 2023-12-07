import {Certificate, Room, UserStatus, Cinema} from "src/types/shared.types";

export type CashierInfo = {
  id: number;
  cinema: Cinema;
  date: string;
  income: number;
  expense: number;
  proceeds: number;
  cashier_start: number;
  cashier_end: number;
  all_by_card: number;
  all_by_cash: number;
};

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
