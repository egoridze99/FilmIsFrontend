import {Moment} from "moment";
import {QueueItemStatusEnum} from "src/types/shared.types";
import {Customer} from "src/models/customers/customer.model";

export type FormikInitialValues = {
  contact: Customer | null;
  date: Moment | null;
  duration: string | null;
  end_time: string | null;
  guests_count: string | null;
  has_another_reservation: boolean;
  note: string | null;
  rooms: number[];
  start_time: string | null;

  status?: QueueItemStatusEnum;
};
