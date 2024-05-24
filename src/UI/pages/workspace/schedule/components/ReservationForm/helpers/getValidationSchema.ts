import * as yup from "yup";

export const getValidationSchema = (isEditMode: boolean) => {
  let shape = {
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
      telephone: yup.string().required("Обязательное поле")
    }),
    rent: yup
      .number()
      .nullable()
      .typeError("Допустимо только числовое значение")
  };

  if (isEditMode) {
    shape = {
      ...shape,
      status: yup.string().required("Обязательное поле")
    } as any;
  }

  return yup.object().shape(shape);
};
