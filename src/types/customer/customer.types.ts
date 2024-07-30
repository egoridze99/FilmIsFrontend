import {Moment} from "moment/moment";

export type CustomerRawType = {
  id: number;
  name: string;
  telephone: string;

  has_comments?: boolean;
  surname?: string;
  patronymic?: string;
  birthday_date?: Moment;
  birthplace?: string;
  passport_issued_by?: string;
  passport_issue_date?: Moment;
  department_code?: string;
  passport_identity?: string;
  gender?: "М" | "Ж";
};
