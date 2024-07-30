import {ReservationResponseType} from "src/types/schedule/schedule.dataClient.types";
import {Customer} from "src/models/customers/customer.model";
import moment from "moment/moment";
import {DATETIME_FORMAT} from "src/constants/date";
import {omit} from "ramda";

export const applyReservationAdapter = (
  reservation: ReservationResponseType,
  customer: Customer
) => {
  return {
    ...omit(["guest_id"], reservation),
    date: moment(reservation.date, DATETIME_FORMAT),
    created_at: moment(reservation.created_at, DATETIME_FORMAT),
    guest: customer
  };
};
