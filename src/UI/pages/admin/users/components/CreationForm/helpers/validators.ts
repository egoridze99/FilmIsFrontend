import * as yup from "yup";

export const validators = yup.object().shape({
  login: yup.string().required("Обязательное поле"),
  name: yup.string().required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Пароль не менее 6 символов"),
  surname: yup.string().required("Обязательное поле"),
  role: yup.string().required("Обязательное поле")
});
