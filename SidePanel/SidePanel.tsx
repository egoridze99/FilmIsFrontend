import React from "react";
import ReactDOM from "react-dom";
import {Button} from "../Button";
import CloseIcon from "./assets/close.svg";
import {CoordinatesType} from "./types";

import "./sidePanel.scss";
import classnames from "classnames";

type SidePanelProps = {
  togglePanel: () => void;
  children: React.ReactNode;
  closeButtonCoordinates?: CoordinatesType;
  width?: number;
  height?: number;
  verticalAlign?: "top" | "bottom" | "middle";
  header?: React.ReactNode;
  classes?: {
    body?: string;
  };
};

export const SidePanel: React.FC<SidePanelProps> = ({
  togglePanel,
  children,
  closeButtonCoordinates = {
    top: 15,
    right: 15
  },
  width = 300,
  height,
  verticalAlign = "top",
  header,
  classes
}) => {
  const panel = (
    <div
      className={classnames("SidePanel", {
        SidePanel_bottom: verticalAlign === "bottom",
        SidePanel_top: verticalAlign === "top",
        SidePanel_middle: verticalAlign === "middle"
      })}
      style={{width, height: height || "100vh"}}
    >
      {header && <div className={"SidePanel__header"}>{header}</div>}
      <div
        className="SidePanel__close"
        style={{
          top: closeButtonCoordinates.top || 15,
          right: closeButtonCoordinates.right || 0,
          bottom: closeButtonCoordinates.bottom || "unset",
          left: closeButtonCoordinates.left || "unset"
        }}
      >
        <Button iconPath={CloseIcon} buttonType="icon" onClick={togglePanel} />
      </div>
      <div className={classnames("SidePanel__body", classes?.body)}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(panel, document.body);
};
