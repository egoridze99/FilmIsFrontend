import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {Reservation} from "src/types/schedule/schedule.types";
import {reservationCardCells} from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard/constants/reservationCardCells";
import {AttachMoney, Edit, History} from "@mui/icons-material";

type ScheduleReservationCardProps = {
  reservation: Reservation;
  classname?: string;
  onEdit(reservation: Reservation): void;
  onSeeChangesHistory(reservationId: number): Promise<void>;
  onLoadTransactions(reservationId: Reservation): Promise<void>;
};

const ScheduleReservationCard: React.FC<ScheduleReservationCardProps> = ({
  reservation,
  classname,
  onEdit,
  onSeeChangesHistory,
  onLoadTransactions
}) => {
  return (
    <ReservationCard
      item={reservation}
      title={reservation.room.name}
      cells={reservationCardCells}
      className={classname}
      actionButtons={[
        {
          tooltip: "Транзакции связанные с резервом",
          onClick: () => onLoadTransactions(reservation),
          Icon: AttachMoney
        },
        {
          tooltip: "История редактирования элемента",
          onClick: () => onSeeChangesHistory(reservation.id),
          Icon: History
        },
        {
          tooltip: "Редактирование элемента",
          onClick: () => onEdit(reservation),
          Icon: Edit
        }
      ]}
    />
  );
};

export default ScheduleReservationCard;
