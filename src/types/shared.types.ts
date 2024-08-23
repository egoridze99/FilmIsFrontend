import {Roles} from "src/types/core.types";
import {Moment} from "moment";
import {DATETIME_FORMAT} from "../constants/date";
import {Customer} from "src/models/customers/customer.model";

export type City = {
  id: number;
  name: string;
  timezone: string;
};

export type Cinema = {
  id: number;
  name: string;
  rooms: Room[];
};

export type Room = {
  id: number;
  name: string;
};

export type UserInfoData = {
  id: number;
  login: string;
  role: Roles;
  name: string;
  surname: string;
  fullname: string;
};

export type Certificate = {
  id: number;
  ident: string;
  created_at: Moment;
  status: CertificateStatusEnum;
  sum: number;
  service: string;
  note: string;
  author: UserInfoData;
  contact: Customer;
  cinema: Cinema;
};

export type QueueItem = {
  author: UserInfoData;
  contact: Customer;
  created_at: Moment;
  start_date: Moment;
  duration: number;
  end_date: Moment | null;
  guests_count: number;
  has_another_reservation: boolean;
  id: number;
  note: string;
  reservation_id: number | null;
  rooms: Room[];
  status: QueueItemStatusEnum;
  view_by: QueueViewLog[];
};

export type QueueViewLog = {
  reservation_id: number;
  created_at: Moment;
  user: UserInfo;
};

export type DateTimeType = typeof DATETIME_FORMAT;

export type UserInfo = {
  id: number;
  login: string;
  role: Roles;
  status: UserStatus;
  fullname: string;
};

export type CustomerComment = {
  id: number;
  text: string;
  created_at: Moment;
  author: string;
};

export type CashierInfo = {
  id: number;
  date: string;
  income: number;
  expense: number;
  proceeds: number;
  cashier_start: number;
  cashier_end: number;
  all_by_card: number;
  all_by_cash: number;
};

export enum CertificateStatusEnum {
  active = "active",
  redeemed = "redeemed"
}

export enum UserStatus {
  active = "active",
  deprecated = "deprecated"
}

export enum QueueItemStatusEnum {
  active = "active",
  expired = "expired",
  reserved = "reserved",
  canceled = "canceled",
  waiting = "waiting"
}
