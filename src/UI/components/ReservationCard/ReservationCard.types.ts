import {Reservation} from "src/types/shared.types";
import React from "react";
import {PanelProps} from "src/UI/components/ReservationCard/components";

export type ReservationCardCell = {
  id: keyof Reservation;
  title?: string;
  size: ((key: keyof Reservation, reservation: Reservation) => number) | number;
  render?: (
    key: keyof Reservation,
    reservation: Reservation
  ) => React.ReactNode;
  shouldRender?: (key: keyof Reservation, reservation: Reservation) => boolean;
  align?: PanelProps["align"];
  postfix?: React.ReactNode;
};
