import * as yup from "yup";
import moment from "moment";

export const getValidationSchema = () => {
  return yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    telephone: yup.string().required("Обязательное поле"),
    surname: yup.string().nullable(),
    patronymic: yup.string().nullable(),
    birthday_date: yup
      .date()
      .test("Дата рождения", "Минимальный возраст 18 лет", (value) => {
        if (!value) {
          return true;
        }

        return moment().diff(moment(value), "years") >= 18;
      })
      .nullable(),
    birthplace: yup.string().nullable(),
    passport_issued_by: yup.string().nullable(),
    passport_issue_date: yup.date().nullable(),
    department_code: yup.string().nullable(),
    passport_identity: yup.string().nullable(),
    gender: yup
      .string()
      .matches(/[М|Ж]{1}/gm)
      .nullable()
  });
};
