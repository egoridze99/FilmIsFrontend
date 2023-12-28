import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {queueReservationCardCells} from "./constants/queueReservationCardCells";
import {QueueItem} from "src/types/shared.types";

export type QueueReservationCardProps = {
  item: QueueItem;
  classname?: string;
  onEdit(): void;
};

const QueueReservationCard: React.FC<QueueReservationCardProps> = ({
  item,
  classname,
  onEdit
}) => {
  return (
    <ReservationCard
      onEdit={onEdit}
      item={item}
      title={item.rooms.map((r) => r.name).join(", ")}
      cells={queueReservationCardCells}
      className={classname}
    />
  );
};

export default QueueReservationCard;
