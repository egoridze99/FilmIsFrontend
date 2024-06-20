import React from "react";
import {IconButton, Tooltip} from "@mui/material";

import "src/UI/components/TransactionsWindow/transactionsWindow.scss";
import {Add, ArrowBack} from "@mui/icons-material";
import TransactionsTable from "src/UI/components/TransactionsWindow/components/TransactionsTable/TransactionsTable";
import TransactionForm from "src/UI/components/TransactionsWindow/components/TransactionForm";
import {TransactionCreationType} from "src/types/transactions/transactions.types";
import {Transaction} from "src/models/transactions/transaction.model";

type TransactionsWindowProps = {
  title?: React.ReactNode | React.ReactNode[];
  customContent?: React.ReactNode | React.ReactNode[];
  onNewTransactionAdd: (data: TransactionCreationType) => Promise<boolean>;
  isLoading: boolean;
  transactions: Transaction[];
  isAddingDisabled?: boolean;
  makeRefund: (id: Transaction) => void;
  isRefundDisabled?: boolean;
  addButtonTooltip?: string;
};

const TransactionsWindow: React.FC<TransactionsWindowProps> = ({
  isLoading,
  customContent,
  onNewTransactionAdd,
  isAddingDisabled,
  title = "Информация о транзакиях",
  transactions,
  makeRefund,
  isRefundDisabled,
  addButtonTooltip
}) => {
  const [isCreationMode, setIsCreationMode] = React.useState(false);

  const addTransaction = async (data: TransactionCreationType) => {
    const newTransaction = await onNewTransactionAdd(data);

    if (newTransaction) {
      setIsCreationMode(false);
      return true;
    }

    return false;
  };

  return (
    <div className="TransactionsWindow">
      <div className="TransactionsWindow__body">
        {!isAddingDisabled && (
          <div className="TransactionsWindow__create-btn">
            <Tooltip
              title={
                isCreationMode
                  ? "Назад к списку транзакций"
                  : `Добавить транзакцию${
                      addButtonTooltip ? `. ${addButtonTooltip}` : ""
                    }`
              }
            >
              <IconButton onClick={() => setIsCreationMode((prev) => !prev)}>
                {isCreationMode ? <ArrowBack /> : <Add />}
              </IconButton>
            </Tooltip>
          </div>
        )}

        {isCreationMode ? (
          <TransactionForm onNewTransactionAdd={addTransaction} />
        ) : (
          <TransactionsTable
            isRefundDisabled={isRefundDisabled}
            makeRefund={makeRefund}
            transactions={transactions}
            isLoading={isLoading}
            title={title}
            customContent={customContent}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionsWindow;
