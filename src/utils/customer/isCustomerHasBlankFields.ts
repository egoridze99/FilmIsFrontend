import {Customer} from "src/types/customer.types";
import {omit} from "ramda";

export const isCustomerHasBlankFields = (customer: Customer) => {
  return Object.values(omit(["name", "telephone", "id"], customer)).some(
    (i) => !i
  );
};
