import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {queueReservationCardCells} from "./constants/queueReservationCardCells";
import {QueueItem} from "src/types/shared.types";
import {Edit, SwapHoriz} from "@mui/icons-material";
import moment from "moment";

export type QueueReservationCardProps = {
  item: QueueItem;
  classname?: string;
  onEdit(item: QueueItem): void;
  onCreateScratch(item: QueueItem): void;
};

const QueueReservationCard: React.FC<QueueReservationCardProps> = ({
  item,
  classname,
  onEdit,
  onCreateScratch
}) => {
  return (
    <ReservationCard
      item={item}
      title={item.rooms.map((r) => r.name).join(", ")}
      cells={queueReservationCardCells}
      className={classname}
      actionButtons={[
        {
          tooltip: "Создать резерв",
          onClick: () => onCreateScratch(item),
          Icon: SwapHoriz
        },
        {
          tooltip: "Редактирование элемента",
          onClick: () => onEdit(item),
          Icon: Edit
          // shouldRender: () =>
          //   moment(item.date, "DD-MM-YYYY").isSameOrAfter(moment())
        }
      ]}
    />
  );
};

export default QueueReservationCard;
