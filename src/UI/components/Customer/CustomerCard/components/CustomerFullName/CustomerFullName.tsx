import React from "react";
import {Customer} from "src/models/customers/customer.model";
import {observer} from "mobx-react-lite";

const CustomerFullName: React.FC<{customer: Customer | null}> = ({
  customer
}) => {
  return <>{customer?.fullname || null}</>;
};

export default observer(CustomerFullName);
