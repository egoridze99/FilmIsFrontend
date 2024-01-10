import React from "react";
import {Badge, IconButton, Tooltip} from "@mui/material";
import {Settings, Tune} from "@mui/icons-material";

import "./toolbar.scss";

type AnalyticsToolbarProps = {
  openSettings(): void;
};

const AnalyticsToolbar: React.FC<AnalyticsToolbarProps> = ({openSettings}) => {
  return (
    <div className="AnalyticsToolbar">
      <Tooltip
        title={"Открыть панель настроек"}
        className="AnalyticsToolbar__item"
      >
        <IconButton onClick={openSettings}>
          <Settings color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AnalyticsToolbar;
