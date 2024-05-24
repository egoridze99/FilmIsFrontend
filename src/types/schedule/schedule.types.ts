import {Certificate, Room, UserStatus, Cinema} from "src/types/shared.types";
import {Customer} from "src/types/customer.types";
import {Moment} from "moment";

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

  date: Moment;
  duration: number;

  count: number; // Кол-во человек
  room: Room;
  guest: Customer;

  film: string;
  note: string;
  author: {
    fullname: string;
    status: UserStatus;
  };
  status: ReservationStatus;

  rent: number;
  certificate: Certificate | null;

  created_at: Moment;
};

export type ChangesItemType = {
  card: number;
  cash: number;
  count: number;
  duration: number;
  film: string;
  guest_name: string;
  guest_telephone: string;
  note: string;
  room: string;
  status: string;
  sum_rent: number;
  time: string;
};

export enum ReservationStatus {
  not_allowed = "not_allowed",
  waiting = "waiting",
  progress = "progress",
  finished = "finished",
  canceled = "canceled"
}
