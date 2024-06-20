import * as yup from "yup";

export const validationSchema = yup.object().shape({
  card: yup.number().typeError("Числовое поле"),
  cash: yup.number().typeError("Числовое поле"),
  cinema_id: yup.number().required("Обязательное поле"),
  contact: yup.object().required("Обязательное поле"),
  note: yup.string().nullable(),
  service: yup.string().required("Обязательное поле"),
  transactions: yup.array().of(
    yup.object().shape({
      transaction_type: yup.string().required("Обязательное поле"),
      sum: yup
        .number()
        .required("Обязательное поле")
        .typeError("Введите числовое значение")
    })
  ),
  sum: yup
    .number()
    .required()
    .typeError("Числовое поле")
    .when(["transactions"], ([transactions], schema) => {
      return schema.max(
        transactions.reduce((acc, t) => acc + parseInt(t.sum), 0),
        "Сумма сертификата больше, чем сумма транзакций"
      );
    })
});
