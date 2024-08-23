import React from "react";
import {TransactionStatusEnum} from "src/types/transactions/transactions.types";
import {observer} from "mobx-react-lite";
import {Transaction} from "src/models/transactions/transaction.model";
import {LoadingButton} from "@mui/lab";
import {Formik} from "formik";

export const RefundButtonCell: React.FC<{
  transaction: Transaction;
  makeRefund: () => Promise<void>;
  disabled?: boolean;
}> = observer(({makeRefund, disabled, transaction}) => {
  return (
    <Formik initialValues={{}} onSubmit={makeRefund}>
      {({isSubmitting, submitForm}) => {
        return (
          <LoadingButton
            variant="contained"
            size="small"
            onClick={submitForm}
            disabled={
              disabled ||
              transaction.transaction_status === TransactionStatusEnum.refunded
            }
            loading={isSubmitting}
          >
            Сделать возврат
          </LoadingButton>
        );
      }}
    </Formik>
  );
});
