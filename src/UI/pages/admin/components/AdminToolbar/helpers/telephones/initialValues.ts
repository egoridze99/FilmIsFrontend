export type TelephonesFormInitialValues = {
  city: number | null;
  min_visits: number | null;
  last_visit_threshold: Date | null;
  ignore_before_date: Date | null;
};

export const initialValues: TelephonesFormInitialValues = {
  city: null,
  min_visits: null,
  last_visit_threshold: null,
  ignore_before_date: null
};
