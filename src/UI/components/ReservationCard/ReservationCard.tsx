import React from "react";
import classNames from "classnames";
import {Box, Grid} from "@mui/material";
import {ReservationCardCell} from "src/UI/components/ReservationCard/ReservationCard.types";
import {CardContainer, CreationInfo, Title, Panel} from "./components";

import "./reservationCard.scss";

export type ReservationCardProps<T extends object = any> = {
  title: React.ReactNode;
  item: T;
  cells: ReservationCardCell<T>[];

  extraContent?: React.ReactNode;
  className?: string;
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  item,
  title,
  cells,
  className,
  extraContent
}) => {
  return (
    <CardContainer classname={classNames(className)}>
      <Title>{title}</Title>
      <CreationInfo data={item} />
      <Box flexGrow={1} mt={2}>
        <Grid container spacing={2}>
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
                    <>
                      {cell.title && `${cell.title}: `}
                      {item[cell.id] as string}
                    </>
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
