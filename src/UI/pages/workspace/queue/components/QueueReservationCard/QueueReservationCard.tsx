import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {queueReservationCardCells} from "./constants/queueReservationCardCells";
import {QueueItem} from "src/types/shared.types";

export type QueueReservationCardProps = {
  item: QueueItem;
  classname?: string;
};

const QueueReservationCard: React.FC<QueueReservationCardProps> = ({
  item,
  classname
}) => {
  return (
    <ReservationCard
      item={item}
      title={item.rooms.map((r) => r.name).join(", ")}
      cells={queueReservationCardCells}
      className={classname}
    />
  );
};

export default QueueReservationCard;
