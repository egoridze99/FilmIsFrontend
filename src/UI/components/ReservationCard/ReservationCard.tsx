import React from "react";
import {Reservation} from "src/types/shared.types";
import classNames from "classnames";
import {Box, Grid} from "@mui/material";
import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {CardContainer, CreationInfo, Title, Panel} from "./components";

import "./reservationCard.scss";

export type ReservationCardProps = {
  title: React.ReactNode;
  reservation: Reservation;
  cells: ReservationCardCell[];

  className?: string;
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  title,
  cells,
  className
}) => {
  return (
    <CardContainer classname={classNames(className)}>
      <Title>{title}</Title>
      <CreationInfo data={reservation} />
      <Box flexGrow={1} mt={2}>
        <Grid container spacing={2}>
          {cells.map((cell) =>
            (cell.shouldRender && cell.shouldRender(cell.id, reservation)) ??
            true ? (
              <Grid
                item
                md={
                  typeof cell.size === "function"
                    ? cell.size(cell.id, reservation)
                    : cell.size
                }
              >
                <Panel
                  align={cell.align}
                  withPadding={cell.align && cell.align !== "center"}
                >
                  {cell.render ? (
                    cell.render(cell.id, reservation)
                  ) : (
                    <>
                      {cell.title && `${cell.title}: `}
                      {reservation[cell.id] as string}
                    </>
                  )}
                </Panel>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
    </CardContainer>
  );
};

export default ReservationCard;
