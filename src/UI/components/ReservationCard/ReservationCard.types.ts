import React from "react";
import {PanelProps} from "src/UI/components/ReservationCard/components";

export type ReservationCardCell<T extends object> = {
  id: keyof T;
  title?: string;
  size: ((key: keyof T, data: T) => number) | number;
  render?: (key: keyof T, data: T) => React.ReactNode;
  shouldRender?: (key: keyof T, data: T) => boolean;
  align?: PanelProps["align"];
  postfix?: React.ReactNode;
};
