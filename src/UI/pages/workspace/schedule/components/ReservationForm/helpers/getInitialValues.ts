import {Reservation} from "src/types/schedule/schedule.types";
import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import {Cinema} from "src/types/shared.types";
import moment from "moment";
import {clone} from "ramda";

export const getInitialValues = (
  cinemas: Cinema[],
  reservation?: Reservation | null
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
      rent: 0,
      certificate_ident: null,
      certificate: null
    };
  } else {
    const cinema = cinemas.find((c) =>
      c.rooms.some((r) => r.id === reservation.room.id)
    ) as Cinema;

    return {
      ...clone(reservation),
      cinema: cinema.id,
      room: reservation.room.id,
      date: moment(reservation.date, "DD-MM-YYYY"),
      certificate_ident: reservation.certificate?.ident,
      rent: reservation.rent || 0,
      card: reservation.card || 0,
      cash: reservation.cash || 0,
      checkouts: reservation.checkouts.map((c) => ({
        id: c.id as number,
        note: c.note,
        sum: c.sum
      }))
    } as FormikInitialValuesType;
  }
};
