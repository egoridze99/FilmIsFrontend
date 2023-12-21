import React from "react";
import {CalendarIcon, DatePickerProps} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {IconButton, TextField} from "@mui/material";

const Datepicker: React.FC<DatePickerProps<any>> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = (event: Event) => {
    event.preventDefault();
    setIsOpen((p) => !p);
  };

  return (
    <DatePicker
      {...props}
      open={props.open || isOpen}
      onOpen={props.onOpen ? props.onOpen : () => setIsOpen(true)}
      onClose={props.onClose ? props.onClose : () => setIsOpen(false)}
      slots={{textField: TextField, openPickerButton: IconButton}}
      slotProps={{
        textField: {
          variant: "standard",
          onClick: toggleOpen as any
        },
        openPickerButton: {
          children: <CalendarIcon />,
          onClick: toggleOpen as any
        }
      }}
    />
  );
};

export default Datepicker;
