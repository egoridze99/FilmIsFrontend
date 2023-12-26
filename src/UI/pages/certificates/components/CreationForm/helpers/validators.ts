import * as yup from "yup";

export const validationSchema = yup.object().shape({
  card: yup.number().typeError("Числовое поле"),
  cash: yup.number().typeError("Числовое поле"),
  cinema_id: yup.number().required("Обязательное поле"),
  contact: yup.string().required("Обязательное поле"),
  note: yup.string().nullable(),
  service: yup.string().required("Обязательное поле"),
  sum: yup
    .number()
    .required()
    .typeError("Числовое поле")
    .when(["card", "cash"], ([card, cash], schema) => {
      return schema.max(
        card || 0 + cash || 0,
        "Сумма сертификата больше, чем сумма карты и налички"
      );
    }),
  telephone: yup.string().required("Обязательное поле")
});
