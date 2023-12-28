import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {queueReservationCardCells} from "./constants/queueReservationCardCells";
import {QueueItem} from "src/types/shared.types";
import {Edit} from "@mui/icons-material";

export type QueueReservationCardProps = {
  item: QueueItem;
  classname?: string;
  onEdit(item: QueueItem): void;
};

const QueueReservationCard: React.FC<QueueReservationCardProps> = ({
  item,
  classname,
  onEdit
}) => {
  return (
    <ReservationCard
      item={item}
      title={item.rooms.map((r) => r.name).join(", ")}
      cells={queueReservationCardCells}
      className={classname}
      actionButtons={[
        {
          tooltip: "Редактирование элемента",
          onClick: () => onEdit(item),
          Icon: Edit
        }
      ]}
    />
  );
};

export default QueueReservationCard;
