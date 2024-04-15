import React from "react";
import {IconButton, Tooltip} from "@mui/material";
import {People} from "@mui/icons-material";
import CustomerSearchWindow from "src/UI/components/Customer/CustomerSearchWindow";
import {CustomerService} from "src/services/customer.service";
import {useCustomerCardProps} from "src/hooks/useCustomerCardProps";
import CustomerCard from "src/UI/components/Customer/CustomerCard";
import {Customer} from "src/types/customer.types";

type CustomerSearchButtonProps = {
  customerService: CustomerService;
};

const CustomerSearchButton: React.FC<CustomerSearchButtonProps> = ({
  customerService
}) => {
  const [isSearchModalOpened, setIsSearchModalOpened] = React.useState(false);

  const {
    openCustomerCardDialog,
    closeCustomerCardDialog,
    customer,
    onCustomerEdit
  } = useCustomerCardProps();

  return (
    <>
      <Tooltip title="Управление пользователями">
        <IconButton onClick={() => setIsSearchModalOpened(true)}>
          <People color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>
      <CustomerSearchWindow
        open={isSearchModalOpened}
        onClose={() => setIsSearchModalOpened(false)}
        openCustomerCart={openCustomerCardDialog}
        customerService={customerService}
      />
      <CustomerCard
        customer={customer as Customer}
        onClose={closeCustomerCardDialog}
        onEdit={onCustomerEdit}
      />
    </>
  );
};

export default CustomerSearchButton;
