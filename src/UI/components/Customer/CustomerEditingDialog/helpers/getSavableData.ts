import moment from "moment";
import {DATE_FORMAT} from "src/constants/date";
import {UserEditingFormValues} from "src/UI/components/Customer/CustomerEditingDialog/CustomerEditingDialog.types";

export const getSavableData = (values: UserEditingFormValues) => {
  return {
    ...values,
    birthday_date: values.birthday_date
      ? moment(values.birthday_date).format(DATE_FORMAT)
      : null,
    passport_issue_date: values.passport_issue_date
      ? moment(values.passport_issue_date).format(DATE_FORMAT)
      : null
  };
};
