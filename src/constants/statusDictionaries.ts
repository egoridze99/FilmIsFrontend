import {ReservationStatus} from "src/types/schedule/schedule.types";
import {CertificateStatusEnum} from "src/types/shared.types";

export const reservationStatusDictionary: Record<
  ReservationStatus,
  {type: ReservationStatus; title: string}
> = {
  [ReservationStatus.not_allowed]: {
    type: ReservationStatus.not_allowed,
    title: "Не подтверждено 🙈"
  },
  [ReservationStatus.waiting]: {
    type: ReservationStatus.waiting,
    title: "Ждем гостей 😊"
  },
  [ReservationStatus.progress]: {
    type: ReservationStatus.progress,
    title: "Гости уже в зале! 🤪"
  },
  [ReservationStatus.finished]: {
    type: ReservationStatus.finished,
    title: "Сеанс завершен 🤑"
  },
  [ReservationStatus.canceled]: {
    type: ReservationStatus.canceled,
    title: "Гости отменили бронь 😞"
  }
};

export const certificatesStatusDictionary: Record<
  CertificateStatusEnum,
  string
> = {
  [CertificateStatusEnum.active]: "Активно",
  [CertificateStatusEnum.redeemed]: "Погашено"
};
