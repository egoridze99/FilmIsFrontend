import React from "react";
import {Field, useFormikContext} from "formik";
import {Autocomplete} from "formik-mui";
import {CircularProgress, TextField} from "@mui/material";
import {CustomerService} from "src/services/customer.service";
import CustomerEditingDialog from "src/UI/components/Customer/CustomerEditingDialog";
import {useLoadOptions} from "src/UI/components/Customer/CustomerAutocomplete/hooks/useLoadOptions";

import "src/UI/components/Customer/CustomerAutocomplete/customerAutocomplete.scss";
import {Customer} from "src/models/customers/customer.model";
import {CustomerRawType} from "src/types/customer/customer.types";

type UserAutocompleteProps = {
  name: string;
  label: string;
  required?: boolean;

  customerService: CustomerService;
};

/**
 * Использовать только внутри Formik!!!
 * @constructor
 */
const CustomerAutocomplete: React.FC<UserAutocompleteProps> = ({
  name,
  label,
  required,
  customerService
}) => {
  const [isFormDialogOpen, setIsDialogFormOpen] = React.useState(false);

  const formikContext = useFormikContext();

  const {options, setSearchValue, isLoading} = useLoadOptions(
    customerService,
    formikContext.values?.[name]
  );

  const createUser = async (data: CustomerRawType) => {
    const newUser = await customerService.createUser(data);

    if (!newUser) {
      return false;
    }

    setSearchValue(newUser.telephone);
    await formikContext.setFieldValue(name, newUser);
    return true;
  };

  if (!formikContext) {
    return null;
  }

  return (
    <>
      <CustomerEditingDialog
        open={isFormDialogOpen}
        onClose={() => setIsDialogFormOpen(false)}
        onApply={createUser}
      />
      <Field
        onChange={(_, val: Customer | string) => {
          if (typeof val === "string") {
            setIsDialogFormOpen(true);
          } else {
            formikContext.setFieldValue(name, val);
          }
        }}
        options={options}
        selectOnFocus
        clearOnBlur
        component={Autocomplete}
        filterOptions={(x) => x}
        autoComplete
        filterSelectedOptions
        getOptionLabel={(option: Customer | string) => {
          return typeof option === "string" ? option : option.telephone || "";
        }}
        loading={isLoading}
        loadingText={<CircularProgress color="inherit" size={20} />}
        renderOption={(props, option: Customer | string) => (
          <li {...props}>
            {typeof option === "string"
              ? option
              : `${option.name} ${option.telephone}`}
          </li>
        )}
        onInputChange={(_, newInputValue: string) => {
          setSearchValue(newInputValue);
        }}
        name={name}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={formikContext.values?.[name]?.name || label}
              variant="standard"
              required={required}
            />
          );
        }}
        required={required}
      />
    </>
  );
};

export default CustomerAutocomplete;
