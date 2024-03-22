import {Moment} from "moment";
import {ReservationStatus} from "src/types/schedule/schedule.types";
import {Certificate} from "src/types/shared.types";
import {Customer} from "src/types/customer.types";

export type FormikInitialValuesType = {
  cinema: number | null;
  room: number | null;
  date: Moment | null;
  time: string | null;
  duration: number | null;
  count: number | null;
  guest: Customer | null;
  film: string | null;
  note: string | null;
  rent: number | null;
  certificate_ident: string | null;

  certificate: Certificate | null;

  status?: ReservationStatus;
  card?: number;
  cash?: number;
  checkouts?: {id: number; note: string; sum: number}[];
};
