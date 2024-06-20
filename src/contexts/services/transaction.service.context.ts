import {transactionService} from "src/app/app.composition";
import React from "react";

const transactionServiceContext = React.createContext(transactionService);

export const useTransactionService = () =>
  React.useContext(transactionServiceContext);
