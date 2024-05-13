import {Customer} from "src/types/customer.types";
import {omit} from "ramda";

export const isCustomerHasBlankFields = (customer: Customer) => {
  return Object.values(
    omit(
      ["name", "telephone", "id", "has_comments"] as Array<keyof Customer>,
      customer
    )
  ).some((i) => !i);
};
