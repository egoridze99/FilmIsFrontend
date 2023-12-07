import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {Reservation} from "src/types/schedule/schedule.types";
import {reservationCardCells} from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard/constants/reservationCardCells";
import CheckoutsTable from "./components/CheckoutsTable";

type ScheduleReservationCard = {
  reservation: Reservation;
  classname?: string;
};

const ScheduleReservationCard: React.FC<ScheduleReservationCard> = ({
  reservation,
  classname
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
    />
  );
};

export default ScheduleReservationCard;
