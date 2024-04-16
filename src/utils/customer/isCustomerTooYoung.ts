import {Customer} from "src/types/customer.types";
import moment from "moment";

export const isCustomerTooYoung = (customer: Customer) => {
  return moment().diff(customer.birthday_date, "years");
};
