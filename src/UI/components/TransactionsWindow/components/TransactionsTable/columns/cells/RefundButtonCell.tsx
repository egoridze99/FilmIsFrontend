import React from "react";
import {TransactionStatusEnum} from "src/types/transactions/transactions.types";
import {Button} from "@mui/material";
import {observer} from "mobx-react-lite";
import {Transaction} from "src/models/transactions/transaction.model";

export const RefundButtonCell: React.FC<{
  transaction: Transaction;
  makeRefund: () => void;
  disabled?: boolean;
}> = observer(({makeRefund, disabled, transaction}) => {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={makeRefund}
      disabled={
        disabled ||
        transaction.transaction_status === TransactionStatusEnum.refunded
      }
    >
      Сделать возврат
    </Button>
  );
});
