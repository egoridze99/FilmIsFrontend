import {QueueItem} from "src/types/shared.types";
import {FormikInitialValues} from "src/UI/pages/workspace/queue/components/QueueForm/QueueForm.types";
import moment from "moment";

export const getInitialValues = (
  queueItem?: QueueItem | null
): FormikInitialValues => {
  if (!queueItem) {
    return {
      contact: null,
      date: null,
      duration: null,
      end_time: null,
      guests_count: null,
      has_another_reservation: false,
      note: null,
      rooms: [],
      start_time: null,
      telephone: null
    } as FormikInitialValues;
  }

  return {
    contact: queueItem.contact,
    date: queueItem.start_date,
    duration: queueItem.duration.toString(),
    end_time: queueItem.end_date?.format("HH:mm") || null,
    guests_count: queueItem.guests_count.toString(),
    has_another_reservation: queueItem.has_another_reservation,
    note: queueItem.note,
    rooms: queueItem.rooms.map((r) => r.id),
    start_time: queueItem.start_date.format("HH:mm"),
    status: queueItem.status
  } as FormikInitialValues;
};
