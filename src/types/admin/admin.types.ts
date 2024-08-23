import {Roles} from "../core.types";

export type AnalyticType = Array<{
  cinema_id: number;
  cinema_name: string;
  total_duration?: number;
  expense?: {
    cinema: number;
    reservations: number;
    total: number;
  };
  income?: {
    cinema?: {
      card: number;
      cash: number;
      sbp: number;
      total: number;
    };
    reservations?: {
      card: number;
      cash: number;
      sbp: number;
      total: number;
    };
    total?: {
      card: number;
      cash: number;
      sbp: number;
      total: number;
    };
  };
  refunds?: {
    cinema: number;
    reservations: number;
    total: number;
  };
  rooms: Array<{
    room_id: number;
    room_name: string;
    expense?: number;
    income?: {
      card: number;
      cash: number;
      sbp: number;
      total: number;
    };
    refunds?: number;
    total_duration?: number;
  }>;
}>;

export type UserCreationBodyType = {
  login: string;
  password: string;
  name: string;
  surname: string;
  role: Roles;
};
