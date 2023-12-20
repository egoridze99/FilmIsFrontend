import {Reservation} from "src/types/schedule/schedule.types";
import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";

export const getInitialValues = (
  reservation?: Reservation
): FormikInitialValuesType => {
  if (!reservation) {
    return {
      cinema: null,
      room: null,
      date: null,
      time: null,
      duration: null,
      count: null,
      guest: {
        name: null,
        tel: null
      },
      film: null,
      note: null,
      rent: null,
      certificate_ident: null
    };
  } else {
    return {} as FormikInitialValuesType;
  }
};
