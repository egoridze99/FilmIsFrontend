import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {Reservation} from "src/types/schedule/schedule.types";
import {reservationCardCells} from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard/constants/reservationCardCells";
import CheckoutsTable from "./components/CheckoutsTable";
import {Edit, History} from "@mui/icons-material";

type ScheduleReservationCardProps = {
  reservation: Reservation;
  classname?: string;
  onEdit(reservation: Reservation): void;
  onSeeChangesHistory(reservationId: number): Promise<void>;
};

const ScheduleReservationCard: React.FC<ScheduleReservationCardProps> = ({
  reservation,
  classname,
  onEdit,
  onSeeChangesHistory
}) => {
  const checkoutsTable = reservation.checkouts.length ? (
    <CheckoutsTable checkouts={reservation.checkouts} />
  ) : null;

  return (
    <ReservationCard
      item={reservation}
      title={reservation.room.name}
      cells={reservationCardCells}
      className={classname}
      extraContent={checkoutsTable}
      actionButtons={[
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
