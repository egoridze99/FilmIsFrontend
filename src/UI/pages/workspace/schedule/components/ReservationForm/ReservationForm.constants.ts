import * as yup from "yup";

export const getValidationSchema = () => {
  const baseValidators = yup.object().shape({
    room: yup.number().required("Обязательное поле"),
    date: yup.date().required("Обязательное поле"),
    time: yup
      .string()
      .required("Обязательное поле")
      .matches(/^[0-9][0-9]:[0-9][0-9]$/, "Допустимый формат HH:MM"),
    duration: yup
      .number()
      .typeError("Допустимо только числовое значение")
      .required("Обязательное поле")
      .moreThan(0),
    count: yup
      .number()
      .typeError("Допустимо только числовое значение")
      .required("Обязательное поле")
      .moreThan(0),
    guest: yup.object().shape({
      name: yup.string().required("Обязательное поле"),
      tel: yup.string().required("Обязательное поле")
    }),
    rent: yup
      .number()
      .nullable()
      .typeError("Допустимо только числовое значение")
  });

  return baseValidators;
};
