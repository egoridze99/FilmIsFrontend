import {Roles} from "src/types/core.types";

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
  created_at_as_date: Date;
  created_at: string;
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
  created_at: string;
  date: string;
  duration: number;
  end_time: string | null;
  guests_count: number;
  has_another_reservation: boolean;
  id: number;
  note: string;
  reservation_id: number | null;
  rooms: Room[];
  start_time: string;
  status: QueueItemStatusEnum;
  view_by: QueueViewLog[];
};

export type QueueViewLog = {
  reservation_id: number;
  created_at: string;
  user: UserInfo;
};

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
