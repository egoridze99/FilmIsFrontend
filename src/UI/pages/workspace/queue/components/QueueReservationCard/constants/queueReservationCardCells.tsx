import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {QueueItem, QueueItemStatusEnum} from "src/types/shared.types";
import React from "react";
import {queueStatusDict} from "src/constants/statusDictionaries";
import CustomerCell from "src/UI/components/Customer/CustomerCell";
import {Customer} from "src/models/customers/customer.model";

export const queueReservationCardCells = [
  {
    id: "start_time",
    title: "Время",
    size: 2,
    render: (key, data) =>
      `Время: ${data.start_date.format("HH:mm")}${
        data.end_date ? ` - ${data.end_date.format("HH:mm")}` : ""
      }`
  },
  {id: "duration", title: "Продолжительность", size: 2},
  {id: "guests_count", title: "Гостей", size: 2},
  {
    id: "contact",
    size: 2,
    render: (key, data) => <CustomerCell customer={data[key] as Customer} />
  },
  {
    id: "status",
    title: "Статус",
    size: 2,
    render: (key, data) =>
      queueStatusDict[data[key] as QueueItemStatusEnum].title
  },
  {
    id: "has_another_reservation",
    title: "-",
    size: 2,
    render: (key, data) =>
      data[key] ? (
        <span style={{color: "#e31235"}}>Есть другое бронирование</span>
      ) : (
        "Нет другого бронирования"
      )
  },
  {
    id: "note",
    title: "Примечание",
    size: 12,
    shouldRender: (key, data) => {
      return !!data[key];
    },
    render: (key, data) => `Примечание: ${data[key]}`,
    align: "left"
  }
] as ReservationCardCell<QueueItem>[];
