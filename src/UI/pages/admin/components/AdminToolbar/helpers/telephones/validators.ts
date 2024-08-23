import * as yup from "yup";

export const telephoneValidators = yup.object().shape({
  city: yup.number().nullable(),
  min_visits: yup
    .number()
    .typeError("Допустимы только числовые значения")
    .nullable(),

  last_visit_threshold: yup.date().nullable(),
  ignore_before_date: yup.date().nullable()
});
