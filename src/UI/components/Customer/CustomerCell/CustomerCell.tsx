import React from "react";
import {Customer} from "src/types/customer.types";

import "./customerCell.scss";
import CustomerCard from "src/UI/components/Customer/CustomerCard";
import {useCustomerCardProps} from "src/hooks/useCustomerCardProps";
import {isCustomerHasBlankFields} from "src/utils/customer/isCustomerHasBlankFields";
import {Icon, Tooltip} from "@mui/material";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

type CustomerCellProps = {
  customer: Customer;
};

const CustomerCell: React.FC<CustomerCellProps> = ({customer}) => {
  const hasCustomerBlankFields = isCustomerHasBlankFields(customer);

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
        {hasCustomerBlankFields && (
          <Tooltip
            title={"Незаполненные паспортные данные"}
            className="CustomerCell__marker"
          >
            <Icon>
              <DoDisturbOnIcon sx={{color: "#e31235", fontSize: "18px"}} />
            </Icon>
          </Tooltip>
        )}

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

export default CustomerCell;
