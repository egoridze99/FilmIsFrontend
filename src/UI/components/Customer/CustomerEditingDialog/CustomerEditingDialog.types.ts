import {Customer} from "src/types/customer.types";
import {Moment} from "moment";

export type UserEditingFormValues = Omit<
  Customer,
  "birthday_date" | "passport_issue_date"
> & {
  birthday_date: Moment | null;
  passport_issue_date: Moment | null;
  gender: "М" | "Ж" | null;
};
