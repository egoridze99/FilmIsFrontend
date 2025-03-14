import React from "react";
import {debounce} from "@mui/material";
import {CustomerService} from "src/services/customer.service";
import {Customer} from "src/models/customers/customer.model";

const addUserOption = "Добавить пользователя";

export const useLoadOptions = (
  customerService: CustomerService,
  initialValue?: Customer
) => {
  const [searchValue, _setSearchValue] = React.useState("");
  const [options, setOptions] = React.useState<Array<Customer | string>>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const lastTypedTelephone = React.useRef<string | null>(
    initialValue?.telephone || null
  );

  const setSearchValue = (val: string) => {
    _setSearchValue(() => {
      if (val !== addUserOption) {
        lastTypedTelephone.current = val;
      }

      return val;
    });
  };

  const loadCustomers = React.useCallback(
    debounce(async (telephone: string) => {
      setIsLoading(true);

      const options = await customerService.loadUser(telephone);
      if (options) {
        setOptions((_) => [...options, addUserOption]);
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
    loadCustomers,
    searchValue: lastTypedTelephone.current || ""
  };
};
