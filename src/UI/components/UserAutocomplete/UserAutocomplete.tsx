import React from "react";

import "./userAutocomplete.scss";
import {Field, useFormikContext} from "formik";
import {Autocomplete} from "formik-mui";
import {CircularProgress, TextField} from "@mui/material";
import {CustomerService} from "src/services/customer.service";
import {Customer} from "src/types/shared.types";
import {useLoadOptions} from "src/UI/components/UserAutocomplete/hooks/useLoadOptions";

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
const UserAutocomplete: React.FC<UserAutocompleteProps> = ({
  name,
  label,
  required,
  customerService
}) => {
  const formikContext = useFormikContext();

  const {options, setSearchValue, isLoading} = useLoadOptions(
    customerService,
    formikContext.values?.[name]
  );

  if (!formikContext) {
    return null;
  }

  return (
    <Field
      onChange={(_, val: Customer) => {
        formikContext.setFieldValue(name, val);
      }}
      options={options}
      component={Autocomplete}
      filterOptions={(x) => x}
      autoComplete
      filterSelectedOptions
      getOptionLabel={(option: Customer) => option.telephone || ""}
      loading={isLoading}
      loadingText={<CircularProgress color="inherit" size={20} />}
      renderOption={(props, option: Customer) => (
        <li {...props}>
          {option.name} {option.telephone}
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
  );
};

export default UserAutocomplete;
