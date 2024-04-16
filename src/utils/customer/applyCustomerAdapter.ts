import {Customer} from "src/types/customer.types";
import moment from "moment";

export const applyCustomerAdapter = (customer: Customer): Customer => {
  return {
    ...customer,
    birthday_date: customer.birthday_date
      ? moment(customer.birthday_date)
      : undefined,
    passport_issue_date: customer.passport_issue_date
      ? moment(customer.passport_issue_date)
      : undefined
  };
};
