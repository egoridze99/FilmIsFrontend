import {Reservation} from "src/types/schedule/schedule.types";
import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import {Cinema, QueueItem} from "src/types/shared.types";
import {clone} from "ramda";
import {Customer} from "src/models/customers/customer.model";

export const getInitialValues = (
  cinemas: Cinema[],
  reservation?: Reservation | QueueItem | null,
  isCreationFromScratch?: boolean
): FormikInitialValuesType => {
  if (!reservation) {
    return {
      cinema: null,
      room: null,
      date: null,
      time: null,
      duration: null,
      count: null,
      guest: null,
      film: null,
      note: null,
      rent: 0,
      certificate_ident: null,
      certificate: null
    };
  }

  if (isCreationFromScratch) {
    reservation = reservation as QueueItem;

    return {
      cinema: null,
      room: null,
      date: reservation.start_date,
      time: reservation.start_date.format("HH:mm"),
      duration: reservation.duration,
      count: reservation.guests_count,
      guest: new Customer({
        id: reservation.contact.id as number,
        name: reservation.contact.name,
        telephone: reservation.contact.telephone
      }),
      film: null,
      note: reservation.note,
      rent: 0,
      certificate_ident: null,
      certificate: null
    };
  }

  reservation = reservation as Reservation;
  const cinema = cinemas.find((c) =>
    c.rooms.some((r) => r.id === (reservation as Reservation).room.id)
  ) as Cinema;

  return {
    ...clone(reservation),
    cinema: cinema.id,
    room: reservation.room.id,
    date: reservation.date,
    time: reservation.date.format("HH:mm"),
    certificate_ident: reservation.certificate?.ident,
    rent: reservation.rent || 0
  } as FormikInitialValuesType;
};
