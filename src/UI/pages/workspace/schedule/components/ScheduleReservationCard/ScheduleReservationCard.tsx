import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {Reservation} from "src/types/shared.types";
import {reservationCardCells} from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard/constants/reservationCardCells";
import {Table, TableCell, TableHead, TableRow} from "@mui/material";
import CheckoutsTable from "./components/CheckoutsTable";

type ScheduleReservationCard = {
  reservation: Reservation;
  classname?: string;
};

const ScheduleReservationCard: React.FC<ScheduleReservationCard> = ({
  reservation,
  classname
}) => {
  const checkoutsTable = reservation.checkouts ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell>Dessert (100g serving)</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  ) : null;

  return (
    <ReservationCard
      item={reservation}
      title={reservation.room.name}
      cells={reservationCardCells}
      className={classname}
      extraContent={<CheckoutsTable checkouts={reservation.checkouts} />}
    />
  );
};

export default ScheduleReservationCard;
