import React from "react";
import {useCustomerService} from "src/contexts/services/customer.service.context";
import {Customer} from "src/models/customers/customer.model";
import {CustomerRawType} from "src/types/customer/customer.types";

export const useCustomerCardProps = () => {
  const customerService = useCustomerService();

  const [customer, setCustomer] = React.useState<Customer | null>(null);

  const open = (customer: Customer) => {
    setCustomer(customer);
  };

  const close = () => {
    setCustomer(null);
  };

  const onEdit = async (editingData: CustomerRawType) => {
    const result = await customerService.editUser(
      customer?.id as number,
      editingData
    );

    if (result) {
      setCustomer(result);
      return true;
    } else {
      return false;
    }
  };

  return {
    onCustomerEdit: onEdit,
    openCustomerCardDialog: open,
    closeCustomerCardDialog: close,
    customer
  };
};
