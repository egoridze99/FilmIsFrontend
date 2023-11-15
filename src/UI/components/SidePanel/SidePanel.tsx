import React from "react";
import ReactDOM from "react-dom";
import {ReactComponent as CloseIcon} from "src/shared/assets/close.svg";
import {CoordinatesType} from "./types";
import classnames from "classnames";
import {IconButton} from "@mui/material";

import "./sidePanel.scss";

type SidePanelProps = {
  isOpen: boolean;
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
  keepAlive?: boolean;
};

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
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
  classes,
  keepAlive = false
}) => {
  const panel = (
    <div
      className={classnames("SidePanel", {
        SidePanel_bottom: verticalAlign === "bottom",
        SidePanel_top: verticalAlign === "top",
        SidePanel_middle: verticalAlign === "middle",
        SidePanel_hidden: !isOpen && keepAlive
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
        <IconButton aria-label="Закрыть" onClick={() => togglePanel()}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classnames("SidePanel__body", classes?.body)}>
        {children}
      </div>
    </div>
  );

  if (!isOpen && !keepAlive) {
    return null;
  }

  return ReactDOM.createPortal(panel, document.body);
};

export default SidePanel;
