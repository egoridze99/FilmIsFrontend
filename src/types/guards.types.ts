import React from "react";

export enum GuardsEnum {
  AUTHENTICATION_GUARD = "AUTHENTICATION_GUARD"
}

export type GuardProps = {
  children?: React.ReactNode;
};

export type Guard = React.FC<GuardProps>;
