import React from "react";
import CustomerCard from "src/UI/components/Customer/CustomerCard";
import {useCustomerCardProps} from "src/hooks/useCustomerCardProps";
import {Tooltip} from "@mui/material";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import {Description} from "@mui/icons-material";
import {Customer} from "src/models/customers/customer.model";
import {observer} from "mobx-react-lite";

import "./customerCell.scss";

type CustomerCellProps = {
  customer: Customer;
};

const CustomerCell: React.FC<CustomerCellProps> = ({customer}) => {
  const {
    onCustomerEdit,
    closeCustomerCardDialog,
    openCustomerCardDialog,
    customer: isOpen
  } = useCustomerCardProps();

  return (
    <>
      <div
        className={"CustomerCell"}
        onClick={() => openCustomerCardDialog(customer)}
      >
        <div className="CustomerCell__markers">
          {customer.has_comments && (
            <Tooltip title={"У пользователя есть оставленные комментарии"}>
              <Description sx={{color: "#007aff", fontSize: "14px"}} />
            </Tooltip>
          )}

          {customer.isCustomerHasBlankFields && (
            <Tooltip title={"Незаполненные паспортные данные"}>
              <DoDisturbOnIcon sx={{color: "#e31235", fontSize: "14px"}} />
            </Tooltip>
          )}
        </div>

        <div>{customer.name}</div>
        <div>{customer.telephone}</div>
      </div>
      <CustomerCard
        customer={isOpen ? customer : null}
        onEdit={onCustomerEdit}
        onClose={closeCustomerCardDialog}
      ></CustomerCard>
    </>
  );
};

export default observer(CustomerCell);
