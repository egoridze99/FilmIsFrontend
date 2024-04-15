import {Moment} from "moment";

export type Customer = {
  id: number;
  name: string;
  surname?: string;
  patronymic?: string;
  telephone: string;
  birthday_date?: Moment;
  birthplace?: string;
  passport_issued_by?: string;
  passport_issue_date?: Moment;
  department_code?: string;
  passport_identity?: string;
  gender?: "М" | "Ж";
};
