import {Roles} from "../core.types";

export type AnalyticType = {
  checkout: {area: string; sum: number}[];
  duration: {area: string; sum: number}[];
  money: {
    area: string;
    card: number;
    cash: number;
    sum: number;
  }[];
};

export type UserCreationBodyType = {
  login: string;
  password: string;
  name: string;
  surname: string;
  role: Roles;
};
