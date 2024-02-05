import React from "react";
import ReservationCard from "src/UI/components/ReservationCard";
import {queueReservationCardCells} from "./constants/queueReservationCardCells";
import {QueueItem} from "src/types/shared.types";
import {Edit, SwapHoriz, Visibility} from "@mui/icons-material";
import moment from "moment";
import {usePopoverProps} from "src/hooks/usePopoverProps";
import PopoverContentContainer from "src/UI/components/containers/PopoverContentContainer";
import {Popover} from "@mui/material";
import "./QueueReservationCard.scss";

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
  const viewsPopoverProps = usePopoverProps("queue-views-popover");

  return (
    <>
      <ReservationCard
        item={item}
        title={item.rooms.map((r) => r.name).join(", ")}
        cells={queueReservationCardCells}
        className={classname}
        actionButtons={[
          {
            tooltip: "Создать резерв",
            onClick: () => onCreateScratch(item),
            Icon: SwapHoriz,
            shouldRender: () =>
              item.start_date.isSameOrAfter(moment(), "day")
          },
          {
            tooltip: "Показать историю просмотров",
            onClick: (e) => viewsPopoverProps.openPopover(e as any),
            Icon: Visibility,
            shouldRender: () => Boolean(item.view_by.length)
          },
          {
            tooltip: "Редактирование элемента",
            onClick: () => onEdit(item),
            Icon: Edit,
            shouldRender: () =>
              item.start_date.isSameOrAfter(moment(), "day")
          }
        ]}
      />
      <Popover
        id={viewsPopoverProps.id}
        open={viewsPopoverProps.isPopoverOpen}
        anchorEl={viewsPopoverProps.anchorEl}
        onClose={viewsPopoverProps.closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <PopoverContentContainer>
          <ul className="QueueReservationCard__logs">
            {item.view_by.map((record) => (
              <li className="QueueReservationCard__logs-item">
                <p>
                  <>
                    {record.user.fullname} при закрытии резерва{" "}
                    {record.reservation_id} в{" "}
                    {record.created_at.format("HH:mm")} (МСК)
                  </>
                </p>
              </li>
            ))}
          </ul>
        </PopoverContentContainer>
      </Popover>
    </>
  );
};

export default QueueReservationCard;
