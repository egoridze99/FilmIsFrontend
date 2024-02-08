import {Roles} from "src/types/core.types";
import {Moment} from "moment";
import {DATETIME_FORMAT} from "../constants/date";

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

export type GuestInfoData = {
  id: number;
  name: string;
  telephone: string;
};

export type Certificate = {
  id: number;
  ident: string;
  created_at: Moment;
  status: CertificateStatusEnum;
  sum: number;
  cash: number;
  card: number;
  service: string;
  note: string;
  author: UserInfoData;
  contact: GuestInfoData;
  cinema: Cinema;
};

export type QueueItem = {
  author: UserInfoData;
  contact: GuestInfoData;
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
