import * as yup from "yup";

export const validationSchema = yup.object().shape({
  contact: yup.string().required("Обязательное поле"),
  date: yup.object().required("Обязательное поле"),
  duration: yup
    .number()
    .required("Обязательное поле")
    .typeError("Числовое значение"),
  end_time: yup
    .string()
    .nullable()
    .matches(/^[0-9][0-9]:[0-9][0-9]$/, "Допустимый формат HH:MM"),
  guests_count: yup
    .number()
    .required("Обязательное поле")
    .typeError("Числовое значение"),
  has_another_reservation: yup.boolean().required("Обязательное поле"),
  note: yup.string().nullable(),
  rooms: yup.array().min(1, "Нужно выбрать как минимум 1 зал").required("Обязательное поле"),
  start_time: yup
    .string()
    .required("Обязательное поле")
    .matches(/^[0-9][0-9]:[0-9][0-9]$/, "Допустимый формат HH:MM"),
  telephone: yup.string().required("Обязательное поле"),
  status: yup.string()
});
