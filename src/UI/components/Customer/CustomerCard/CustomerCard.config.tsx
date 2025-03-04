import React from "react";
import {Customer} from "src/models/customers/customer.model";
import CustomerFullName from "src/UI/components/Customer/CustomerCard/components/CustomerFullName/CustomerFullName";
import moment from "moment";

export const baseFields = [
  {
    title: "ФИО",
    render: (customer: Customer | null) => (
      <CustomerFullName customer={customer} />
    )
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
      if (!customer?.birthday_date) {
        return "Не заполнено";
      }

      if (moment.isMoment(customer.birthday_date)) {
        return customer.birthday_date.format("DD-MM-YYYY");
      }

      return customer.birthday_date;
    }
  },
  {
    title: "Место рождения",
    field: "birthplace"
  },
  {
    title: "Дата выдачи паспорта",
    field: "passport_issue_date",
    render: (customer: Customer | null) => {
      if (!customer?.passport_issue_date) {
        return "Не заполнено";
      }

      if (moment.isMoment(customer.passport_issue_date)) {
        return customer.passport_issue_date.format("DD-MM-YYYY");
      }

      return customer.passport_issue_date;
    }
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
