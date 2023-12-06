import {Paper} from "@mui/material";
import React, {JSX} from "react";

import "./panel.scss";
import classNames from "classnames";

export type PanelProps = {
  children: React.ReactNode | React.ReactNode[];

  withPadding?: boolean;
  classname?: string;
  align?: "left" | "center" | "right";
};

export const Panel: React.FC<PanelProps> = ({
  children,
  align,
  classname = "center",
  withPadding
}) => {
  return (
    <Paper
      className={classNames("ReservationCardPanel", classname, {
        "ReservationCardPanel_left-align": align === "left",
        "ReservationCardPanel_right-align": align === "right",
        "ReservationCardPanel_with-padding": withPadding
      })}
    >
      {children}
    </Paper>
  );
};
