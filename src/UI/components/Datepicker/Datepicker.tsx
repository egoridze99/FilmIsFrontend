import React from "react";
import {DatePickerProps} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TextField, TextFieldProps} from "@mui/material";

const Datepicker: React.FC<DatePickerProps<any>> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DatePicker
      {...props}
      open={props.open || isOpen}
      onOpen={props.onOpen ? props.onOpen : () => setIsOpen(true)}
      onClose={props.onClose ? props.onClose : () => setIsOpen(false)}
      slots={{textField: TextField}}
      slotProps={{
        textField: {
          onClick: (e) => {
            e.preventDefault();
            setIsOpen((p) => !p);
          }
        }
      }}
    />
  );
};

export default Datepicker;
