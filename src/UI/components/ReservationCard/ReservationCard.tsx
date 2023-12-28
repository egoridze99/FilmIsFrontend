import React from "react";
import classNames from "classnames";
import {Box, Grid, IconButton, Tooltip} from "@mui/material";
import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {CardContainer, CreationInfo, Title, Panel} from "./components";
import {Edit, History} from "@mui/icons-material";

import "./reservationCard.scss";

export type ActionButton = {
  tooltip: string;
  onClick(): void;
  Icon: React.FC;
};

export type ReservationCardProps<T extends object = any> = {
  title: React.ReactNode;
  item: T;
  cells: ReservationCardCell<T>[];

  extraContent?: React.ReactNode;
  className?: string;

  actionButtons?: ActionButton[];
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  item,
  title,
  cells,
  className,
  extraContent,
  actionButtons
}) => {
  return (
    <CardContainer classname={classNames(className)}>
      {actionButtons && (
        <div className="ReservationCard__controls">
          {actionButtons?.map((btn) => (
            <Tooltip title={btn.tooltip}>
              <IconButton onClick={btn.onClick}>
                <btn.Icon />
              </IconButton>
            </Tooltip>
          ))}
        </div>
      )}
      <Title>{title}</Title>
      <CreationInfo data={item} />
      <Box flexGrow={1} mt={2}>
        <Grid container spacing={1}>
          {cells.map((cell) =>
            (cell.shouldRender && cell.shouldRender(cell.id, item)) ?? true ? (
              <Grid
                item
                md={
                  typeof cell.size === "function"
                    ? cell.size(cell.id, item)
                    : cell.size
                }
              >
                <Panel
                  align={cell.align}
                  withPadding={cell.align && cell.align !== "center"}
                >
                  {cell.render ? (
                    cell.render(cell.id, item)
                  ) : (
                    <div className="ReservationCard__panel">
                      {cell.title && `${cell.title}: `}
                      {item[cell.id] as string}
                    </div>
                  )}
                </Panel>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
      {extraContent && (
        <Box flexGrow={1} mt={2}>
          {extraContent}
        </Box>
      )}
    </CardContainer>
  );
};

export default ReservationCard;
