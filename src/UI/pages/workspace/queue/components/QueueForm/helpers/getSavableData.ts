import {FormikInitialValues} from "src/UI/pages/workspace/queue/components/QueueForm/QueueForm.types";
import {QueueCreationBodyType} from "src/types/queue/queue.dataClient.types";
import {DATE_FORMAT} from "src/constants/date";

export const getSavableData = (
  values: FormikInitialValues
): QueueCreationBodyType =>
  ({
    ...values,
    date: values.date!.format(DATE_FORMAT),
    guests_count: parseInt(values.guests_count as string),
    duration: parseInt(values.duration as string)
  }) as QueueCreationBodyType;