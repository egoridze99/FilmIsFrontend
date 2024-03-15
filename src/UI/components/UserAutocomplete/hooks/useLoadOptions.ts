import React from "react";
import {Customer} from "src/types/shared.types";
import {debounce} from "@mui/material";
import {CustomerService} from "src/services/customer.service";

export const useLoadOptions = (
  customerService: CustomerService,
  initialValue?: Customer
) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [options, setOptions] = React.useState<Customer[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadCustomers = React.useCallback(
    debounce(async (telephone: string) => {
      setIsLoading(true);

      const options = await customerService.loadUser(telephone);
      if (options) {
        setOptions(options);
      }

      setIsLoading(false);
    }),
    [customerService.loadUser]
  );

  React.useEffect(() => {
    loadCustomers(searchValue);
  }, [searchValue, loadCustomers]);

  React.useEffect(() => {
    if (initialValue) {
      setSearchValue(initialValue.telephone);
    }
  }, []);

  return {
    isLoading,
    options,
    setSearchValue,
    loadCustomers
  };
};
