import React, {JSX} from "react";
import {Card} from "@mui/material";
import classNames from "classnames";

import "./cardContainer.scss";

export type CardContainerProps = {
  children: JSX.Element | JSX.Element[];
  classname?: string;
};

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  classname
}) => {
  return (
    <Card className={classNames("ReservationCardContainer", classname)}>
      {children}
    </Card>
  );
};
