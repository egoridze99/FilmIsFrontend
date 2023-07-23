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
