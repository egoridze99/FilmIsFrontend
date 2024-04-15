import {Customer} from "src/types/customer.types";
import moment from "moment";
import {UserEditingFormValues} from "src/UI/components/CustomerEditingDialog/CustomerEditingDialog.types";
import {omit} from "ramda";

export const getInitialValues = (
  defaultValues?: Customer
): UserEditingFormValues => {
  if (defaultValues) {
    return {
      ...omit(["id"], defaultValues),
      birthday_date: defaultValues.birthday_date
        ? moment(defaultValues.birthday_date, "DD-MM-YYYY")
        : null,
      passport_issue_date: defaultValues.passport_issue_date
        ? moment(defaultValues.passport_issue_date, "DD-MM-YYYY")
        : null,
      gender: defaultValues.gender || "М"
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
    "passport_identity"
  ];

  const data = {
    ...fields.reduce((acc, i) => {
      acc[i] = null;
      return acc;
    }, {}),
    gender: "М"
  };

  return data as UserEditingFormValues;
};
