import React from "react";
import {Transaction} from "src/models/transactions/transaction.model";
import {observer} from "mobx-react-lite";
import {transactionStatusDictionary} from "src/constants/transactionDictionaries";

export const TransactionStatusCell: React.FC<{transaction: Transaction}> =
  observer(({transaction}) => {
    return <>{transactionStatusDictionary[transaction.transaction_status]}</>;
  });
