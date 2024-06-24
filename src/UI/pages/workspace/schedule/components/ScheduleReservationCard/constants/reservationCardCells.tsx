import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import {
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import React from "react";
import {getCertificateNote} from "src/UI/pages/workspace/helpers/getCertificateNote";
import CustomerCell from "src/UI/components/Customer/CustomerCell";
import {Customer} from "src/types/customer.types";

export const reservationCardCells = [
  {
    id: "time",
    title: "Время",
    size: 2,
    render: (key, data) => {
      return `Время: ${data.date.format("HH:mm")} - ${data.date
        .clone()
        .add(data.duration, "h")
        .format("HH:mm")}`;
    }
  },
  {id: "duration", title: "Продолжительность", size: 2},
  {id: "count", title: "Гостей", size: 2},
  {
    id: "guest",
    size: 2,
    render: (key, data) => <CustomerCell customer={data[key] as Customer} />
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
      let note = "Примечание: ";
      let certificateNote = "";

      if (data.certificate) {
        certificateNote = getCertificateNote(data.certificate);
        note = note + certificateNote;
      }

      if (data.note) {
        note = `${note}${certificateNote ? "; " : ""}${data.note}`;
      }

      return note;
    },
    align: "left"
  },
  {
    id: "rent",
    title: "Предварительный расчет",
    size: (_, data) => (data.certificate ? 4 : 6),
    postfix: "₽"
  },
  {
    id: "sum_of_transactions",
    title: "Сумма транзакций",
    size: (_, data) => (data.certificate ? 4 : 6),
    postfix: "₽"
  },
  {
    id: "certificate",
    size: 4,
    shouldRender: (key, data) => !!data[key],
    render: (_, data) => `Сертификат: ${data.certificate?.sum}`
  }
] as ReservationCardCell<Reservation>[];
