import React from "react";
import {useDidMountEffect} from "src/hooks/useDidMountEffect";
import {Box, IconButton, MenuItem, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {Field} from "formik";
import {TextField} from "formik-mui";
import {TransactionTypeEnum} from "src/types/transactions/transactions.types";
import {transactionTypeDictionary} from "src/constants/transactionDictionaries";

import "./transactionsSection.scss";

type Transaction = {
  transaction_type: TransactionTypeEnum | null;
  sum: string | null;
};
const defaultTransactionValues = {
  transaction_type: TransactionTypeEnum.cash,
  sum: null
};

type TransactionsSectionProps = {
  push(val: Transaction): void;
  transactions: Transaction[];

  scrollBottom?: () => void;
};

const TransactionsSection: React.FC<TransactionsSectionProps> = ({
  scrollBottom,
  push,
  transactions
}) => {
  useDidMountEffect(() => {
    scrollBottom && scrollBottom();
  }, [transactions.length]);

  return (
    <div className="TransactionsSection">
      <div className="TransactionsSection__header">
        <Typography variant="h5" fontSize={18}>
          Оплата
        </Typography>
        <IconButton
          onClick={() =>
            push({
              ...defaultTransactionValues
            })
          }
        >
          <Add />
        </IconButton>
      </div>
      {transactions &&
        Boolean(transactions.length) &&
        transactions.map((_, index) => (
          <Box
            key={index}
            marginY={1}
            className="full-width-form-control TransactionsSection__transactions"
          >
            <Field
              component={TextField}
              name={`transactions.${index}.sum`}
              label="Сумма"
              placeholder="Сумма"
              variant="standard"
              required
            />

            <Field
              component={TextField}
              type="text"
              name={`transactions.${index}.transaction_type`}
              label="Тип транзакции"
              select
              variant="standard"
            >
              {Object.values(TransactionTypeEnum)
                .filter(
                  (transactionType) =>
                    transactionType !== TransactionTypeEnum.sbp
                )
                .map((transactionType) => (
                  <MenuItem key={transactionType} value={transactionType}>
                    {transactionTypeDictionary[transactionType]}
                  </MenuItem>
                ))}
            </Field>
          </Box>
        ))}
    </div>
  );
};

export default TransactionsSection;
