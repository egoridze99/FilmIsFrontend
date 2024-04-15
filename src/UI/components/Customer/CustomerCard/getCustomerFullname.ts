import {Customer} from "src/types/customer.types";

const fieldsDecriptionDict = {
  surname: "фамилия",
  patronymic: "отчество"
};

export const getCustomerFullname = (customer: Customer | null) => {
  const emptyValues = ["surname", "patronymic"].filter((i) => !customer?.[i]);

  const fullName = [
    customer?.surname || "",
    customer?.name,
    customer?.patronymic || ""
  ]
    .join(" ")
    .trim();

  return `${fullName}${
    emptyValues.length
      ? ` (${emptyValues
          .map((filed) => fieldsDecriptionDict[filed])
          .join(", ")} не заполнены)`
      : ""
  }`;
};
