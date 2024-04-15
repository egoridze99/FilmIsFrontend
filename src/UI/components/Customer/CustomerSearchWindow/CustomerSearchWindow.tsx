import React from "react";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import CustomerAutocomplete from "src/UI/components/CustomerAutocomplete";
import {Form, Formik} from "formik";
import {Customer} from "src/types/customer.types";
import {CustomerService} from "src/services/customer.service";

import "./customerSearchWindow.scss";

type CustomerSearchWindowProps = {
  open: boolean;
  customerService: CustomerService;

  openCustomerCart(customer: Customer): void;
  onClose(): void;
};

const CustomerSearchWindow: React.FC<CustomerSearchWindowProps> = ({
  open,
  customerService,
  onClose,
  openCustomerCart
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{paper: "CustomerSearchWindow"}}
    >
      <DialogTitle>Поиск пользователя</DialogTitle>
      <DialogContent className={"CustomerSearchWindow__content"}>
        <Formik
          initialValues={{customer: null}}
          onSubmit={(values) => {
            values.customer && openCustomerCart(values.customer as Customer);
            onClose();
          }}
        >
          {({values}) => {
            return (
              <Form>
                <CustomerAutocomplete
                  name="customer"
                  label="Посетитель"
                  customerService={customerService}
                />

                <Button
                  disabled={!values.customer}
                  variant="contained"
                  className="CustomerSearchWindow__apply-btn"
                  type="submit"
                >
                  Открыть карточку пользователя
                </Button>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerSearchWindow;
