import React from "react";
import {IconButton, Tooltip} from "@mui/material";
import {Download} from "@mui/icons-material";

import "./adminToolbar.scss";

export type AdminToolbarProps = {
  getTelephones(): void;
};

const AdminToolbar: React.FC<AdminToolbarProps> = ({getTelephones}) => {
  return (
    <div className="AdminToolbar">
      <Tooltip title={"Загрузить телефонные номера"}>
        <IconButton onClick={getTelephones}>
          <Download color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AdminToolbar;
