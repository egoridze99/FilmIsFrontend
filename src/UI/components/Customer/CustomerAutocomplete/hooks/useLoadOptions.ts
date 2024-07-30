import React from "react";
import {debounce} from "@mui/material";
import {CustomerService} from "src/services/customer.service";
import {Customer} from "src/models/customers/customer.model";

export const useLoadOptions = (
  customerService: CustomerService,
  initialValue?: Customer
) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [options, setOptions] = React.useState<Array<Customer | string>>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadCustomers = React.useCallback(
    debounce(async (telephone: string) => {
      setIsLoading(true);

      const options = await customerService.loadUser(telephone);
      if (options) {
        setOptions((_) => [...options, "Добавить пользователя"]);
      }

      setIsLoading(false);
    }),
    [customerService.loadUser]
  );

  React.useEffect(() => {
    if (initialValue) {
      setSearchValue(initialValue.telephone);
    }
  }, []);

  React.useEffect(() => {
    loadCustomers(searchValue);
  }, [searchValue, loadCustomers]);

  return {
    isLoading,
    options,
    setSearchValue,
    loadCustomers
  };
};
