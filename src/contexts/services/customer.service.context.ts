import {customerService} from "src/app/app.composition";
import React from "react";

const customerServiceContext = React.createContext(customerService);

export const useCustomerService = () =>
  React.useContext(customerServiceContext);
