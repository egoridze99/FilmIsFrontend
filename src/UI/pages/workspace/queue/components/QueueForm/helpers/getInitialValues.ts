import {QueueItem} from "src/types/shared.types";
import {FormikInitialValues} from "src/UI/pages/workspace/queue/components/QueueForm/QueueForm.types";

export const getInitialValues = (
  queueItem?: QueueItem
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

  return {} as FormikInitialValues;
};
