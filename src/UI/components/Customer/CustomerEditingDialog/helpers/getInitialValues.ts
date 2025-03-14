import moment from "moment";
import {UserEditingFormValues} from "src/UI/components/Customer/CustomerEditingDialog/CustomerEditingDialog.types";
import {omit} from "ramda";
import {Customer} from "src/models/customers/customer.model";

export const getInitialValues = (
  defaultValues?: Customer,
  pretypedTelephone?: string
): UserEditingFormValues => {
  if (defaultValues) {
    return {
      ...omit(["id"], defaultValues.fieldsAsDict),
      birthday_date: defaultValues.birthday_date || null,
      passport_issue_date: defaultValues.passport_issue_date
        ? moment(defaultValues.passport_issue_date, "DD-MM-YYYY")
        : null
    } as UserEditingFormValues;
  }

  const fields = [
    "name",
    "surname",
    "patronymic",
    "telephone",
    "birthday_date",
    "birthplace",
    "passport_issued_by",
    "passport_issue_date",
    "department_code",
    "passport_identity",
    "gender"
  ];

  return fields.reduce((acc, i) => {
    acc[i] = i === "telephone" ? (pretypedTelephone ?? null) : null;
    return acc;
  }, {}) as UserEditingFormValues;
};
