import React from "react";
import {IconButton, Tooltip} from "@mui/material";
import {People} from "@mui/icons-material";
import CustomerSearchWindow from "src/UI/components/Customer/CustomerSearchWindow";
import {CustomerService} from "src/services/customer.service";

type CustomerSearchButtonProps = {
  customerService: CustomerService;
};

const CustomerSearchButton: React.FC<CustomerSearchButtonProps> = ({
  customerService
}) => {
  const [isSearchModalOpened, setIsSearchModalOpened] = React.useState(false);

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
        openCustomerCart={(customer) => {
          console.log(customer);
        }}
        customerService={customerService}
      />
    </>
  );
};

export default CustomerSearchButton;
