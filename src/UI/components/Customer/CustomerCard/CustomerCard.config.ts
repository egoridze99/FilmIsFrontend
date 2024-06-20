import {Customer} from "src/types/customer.types";
import {getCustomerFullname} from "src/UI/components/Customer/CustomerCard/getCustomerFullname";

export const baseFields = [
  {
    title: "ФИО",
    render: (customer: Customer | null) => getCustomerFullname(customer)
  },
  {
    title: "Телефон",
    field: "telephone"
  }
];

export const passportFields = [
  {
    title: "Дата рождения",
    field: "birthday_date",
    render: (customer: Customer | null) => {
      return customer?.birthday_date
        ? customer.birthday_date.format("DD-MM-YYYY")
        : "Не заполнено";
    }
  },
  {
    title: "Место рождения",
    field: "birthplace"
  },
  {
    title: "Дата выдачи паспорта",
    field: "passport_issue_date",
    render: (customer: Customer | null) =>
      customer?.passport_issue_date
        ? customer.passport_issue_date.format("DD-MM-YYYY")
        : "Не заполнено"
  },
  {
    title: "Паспорт выдан",
    field: "passport_issued_by"
  },
  {
    title: "Код подразделения",
    field: "department_code"
  },
  {
    title: "Серия и номер паспорта",
    field: "passport_identity"
  },
  {
    title: "Пол",
    render: (customer: Customer | null) =>
      customer?.gender === "М"
        ? "Мужской"
        : customer?.gender === "Ж"
        ? "Женский"
        : "Не заполнено"
  }
];
