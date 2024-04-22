import {DateTimeType} from "src/types/shared.types";

export type User = {
  login: string;
  role: Roles;
  name: string;
};

/**
 * TODO удалить после обновы по ролям
 */
export enum Roles {
  root = "root",
  admin = "admin",
  operator = "operator"
}

export type Nullable<T> = {[K in keyof T]: T[K] | null};

export type ChangesResponseType<T> = {
  author: string;
  created_at: DateTimeType;
  id: number;
  new: T;
  old: T;
};
