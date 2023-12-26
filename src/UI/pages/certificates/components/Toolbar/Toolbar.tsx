import React from "react";
import ToolbarButton from "src/UI/components/ToolbarButton";

import "./toolbar.scss";
import {IconButton, Tooltip} from "@mui/material";
import {FilterAlt} from "@mui/icons-material";

export type ToolbarProps = {
  openCreationPanel(): void;
  openSearchPanel(): void;
};

const Toolbar: React.FC<ToolbarProps> = ({
  openCreationPanel,
  openSearchPanel
}) => {
  return (
    <div className="CertificatesToolbar">
      <Tooltip
        title={"Поиск среди сертификатов"}
        className="CertificatesToolbar__item"
      >
        <IconButton onClick={openSearchPanel}>
          <FilterAlt color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>

      <ToolbarButton
        onClick={openCreationPanel}
        variant={"contained"}
        className="CertificatesToolbar__item"
      >
        Создать сертификат
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
