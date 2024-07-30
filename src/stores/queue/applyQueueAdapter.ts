import {QueueItemResponseType} from "src/types/queue/queue.dataClient.types";
import {Customer} from "src/models/customers/customer.model";
import {QueueItem} from "src/types/shared.types";
import moment from "moment/moment";
import {DATETIME_FORMAT} from "src/constants/date";
import {omit} from "ramda";

export const applyQueueAdapter = (
  queueItem: QueueItemResponseType,
  contact: Customer
): QueueItem => {
  return {
    ...omit(["contact_id"], queueItem),
    contact,
    start_date: moment(queueItem.start_date, DATETIME_FORMAT),
    end_date: queueItem.end_date
      ? moment(queueItem.end_date, DATETIME_FORMAT)
      : null,
    created_at: moment(queueItem.created_at, DATETIME_FORMAT),
    view_by: queueItem.view_by.map((l) => ({
      ...l,
      created_at: moment(l.created_at, DATETIME_FORMAT)
    }))
  };
};
