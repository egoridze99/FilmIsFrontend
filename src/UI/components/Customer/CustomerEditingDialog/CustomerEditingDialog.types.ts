import {Moment} from "moment";
import {CustomerRawType} from "src/types/customer/customer.types";

export type UserEditingFormValues = Omit<
  CustomerRawType,
  "birthday_date" | "passport_issue_date"
> & {
  birthday_date: Moment | null;
  passport_issue_date: Moment | null;
  gender: "М" | "Ж" | null;
};
