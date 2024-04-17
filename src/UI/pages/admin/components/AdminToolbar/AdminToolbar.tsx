import React from "react";
import {IconButton, Tooltip} from "@mui/material";
import {Download} from "@mui/icons-material";

import "./adminToolbar.scss";
import CustomerSearchButton from "src/UI/components/Customer/CustomerSearchButton/CustomerSearchButton";
import {CustomerService} from "src/services/customer.service";

export type AdminToolbarProps = {
  getTelephones(): void;
  customerService: CustomerService;
};

const AdminToolbar: React.FC<AdminToolbarProps> = ({
  getTelephones,
  customerService
}) => {
  return (
    <div className="AdminToolbar">
      <div className="AdminToolbar__item">
        <CustomerSearchButton customerService={customerService} />
      </div>

      <Tooltip
        title={"Загрузить телефонные номера"}
        className="AdminToolbar__item"
      >
        <IconButton onClick={getTelephones}>
          <Download color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default AdminToolbar;
