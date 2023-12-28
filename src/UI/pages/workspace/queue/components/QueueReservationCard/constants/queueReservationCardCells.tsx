import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {QueueItem, QueueItemStatusEnum} from "src/types/shared.types";
import React from "react";
import {queueStatusDict} from "src/constants/statusDictionaries";

export const queueReservationCardCells = [
  {
    id: "start_time",
    title: "Время",
    size: 2,
    render: (key, data) =>
      `Время: ${data.start_time}${data.end_time ? ` - ${data.end_time}` : ""}`
  },
  {id: "duration", title: "Продолжительность", size: 2},
  {id: "guests_count", title: "Гостей", size: 2},
  {
    id: "contact",
    size: 2,
    render: (key, data) => (
      <div
        style={{display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <div>{(data[key] as QueueItem["contact"]).name}</div>
        <div>{(data[key] as QueueItem["contact"]).telephone}</div>
      </div>
    )
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
