import React from "react";
import ToolbarButton from "src/UI/components/ToolbarButton";
import {Badge, IconButton, Tooltip} from "@mui/material";
import {FilterAlt} from "@mui/icons-material";

import "./toolbar.scss";

export type ToolbarProps = {
  openCreationPanel(): void;
  openSearchPanel(): void;
  activeSearchItems: number;
};

const Toolbar: React.FC<ToolbarProps> = ({
  openCreationPanel,
  openSearchPanel,
  activeSearchItems
}) => {
  return (
    <div className="CertificatesToolbar">
      <Tooltip
        title={"Поиск среди сертификатов"}
        className="CertificatesToolbar__item"
      >
        <Badge
          color="secondary"
          badgeContent={
            activeSearchItems ? activeSearchItems.toString() : undefined
          }
        >
          <IconButton onClick={openSearchPanel}>
            <FilterAlt color={"inherit"} style={{color: "#fff"}} />
          </IconButton>
        </Badge>
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
