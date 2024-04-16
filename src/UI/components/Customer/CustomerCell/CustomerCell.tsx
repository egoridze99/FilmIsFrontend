import React from "react";
import {Customer} from "src/types/customer.types";

import "./customerCell.scss";
import CustomerCard from "src/UI/components/Customer/CustomerCard";
import {useCustomerCardProps} from "src/hooks/useCustomerCardProps";

type CustomerCellProps = {
  customer: Customer;
};

const CustomerCell: React.FC<CustomerCellProps> = ({customer}) => {
  const {
    onCustomerEdit,
    closeCustomerCardDialog,
    openCustomerCardDialog,
    customer: customerCopy
  } = useCustomerCardProps();

  return (
    <>
      <div
        className={"CustomerCell"}
        onClick={() => openCustomerCardDialog(customer)}
      >
        <div>{customer.name}</div>
        <div>{customer.telephone}</div>
      </div>
      <CustomerCard
        customer={customerCopy}
        onEdit={onCustomerEdit}
        onClose={closeCustomerCardDialog}
      ></CustomerCard>
    </>
  );
};

export default CustomerCell;
