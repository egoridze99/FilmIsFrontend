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

export enum CertificateStatusEnum {
  active = "active",
  redeemed = "redeemed"
}

export enum UserStatus {
  active = "active",
  deprecated = "deprecated"
}

export enum ReservationStatus {
  not_allowed = "not_allowed",
  progress = "progress",
  waiting = "waiting",
  finished = "finished",
  canceled = "canceled"
}
