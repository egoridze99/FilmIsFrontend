import * as yup from "yup";

export const validationSchema = yup.object().shape(
  {
    ids: yup
      .string()
      .nullable()
      .when("telephones", {
        is: (v) => !v,
        then: (schema) =>
          schema.required("Хотя бы одно поле должно быть заполнено")
      }),
    telephones: yup
      .string()
      .nullable()
      .when("ids", {
        is: (v) => !v,
        then: (schema) =>
          schema.required("Хотя бы одно поле должно быть заполнено")
      })
  },
  [["ids", "telephones"]]
);
