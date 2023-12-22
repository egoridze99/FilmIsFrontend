import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import {
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import React from "react";
import {getCertificateNote} from "src/UI/pages/workspace/helpers/getCertificateNote";

export const reservationCardCells = [
  {id: "time", title: "Время", size: 2},
  {id: "duration", title: "Продолжительность", size: 2},
  {id: "count", title: "Гостей", size: 2},
  {
    id: "guest",
    size: 2,
    render: (key, data) => (
      <div
        style={{display: "flex", flexDirection: "column", alignItems: "center"}}
      >
        <div>{(data[key] as Reservation["guest"]).name}</div>
        <div>{(data[key] as Reservation["guest"]).tel}</div>
      </div>
    )
  },
  {id: "film", title: "Фильм", size: 2},
  {
    id: "status",
    size: 2,
    render: (key, data) =>
      reservationStatusDictionary[data[key] as ReservationStatus].title
  },
  {
    id: "note",
    title: "Примечание",
    size: 12,
    shouldRender: (key, data) => {
      return !!data[key] || !!data.certificate;
    },
    render: (key, data) => {
      let note = "";

      if (data.certificate) {
        note = getCertificateNote(data.certificate);
      }

      if (data.note) {
        note = `${note}${note ? "; " : ""}${data.note}`;
      }

      return note;
    },
    align: "left"
  },
  {
    id: "rent",
    title: "Сумма аренды",
    size: (_, data) => (data.certificate ? 3 : 4),
    postfix: "₽"
  },
  {
    id: "card",
    title: "Картой",
    size: (_, data) => (data.certificate ? 3 : 4),
    postfix: "₽"
  },
  {
    id: "cash",
    title: "Наличкой",
    size: (_, data) => (data.certificate ? 3 : 4),
    postfix: "₽"
  },
  {
    id: "certificate",
    size: 3,
    shouldRender: (key, data) => !!data[key],
    render: (_, data) => `Сертификат: ${data.certificate?.sum}`
  }
] as ReservationCardCell<Reservation>[];
