import React from "react";
import {IconButton, Modal, Tooltip} from "@mui/material";

import "src/UI/components/TransactionsWindow/transactionsWindow.scss";
import {Add, ArrowBack} from "@mui/icons-material";
import TransactionsTable from "src/UI/components/TransactionsWindow/components/TransactionsTable/TransactionsTable";
import TransactionForm from "src/UI/components/TransactionsWindow/components/TransactionForm";
import {TransactionCreationType} from "src/types/transactions/transactions.types";
import {Transaction} from "src/models/transactions/transaction.model";
import {
  ChangesHistoryType,
  useChangesHistory
} from "src/hooks/useChangesHistory";
import ChangesHistoryModal from "src/UI/pages/workspace/components/ChangesHistoryModal";

type TransactionsWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode | React.ReactNode[];
  customContent?: React.ReactNode | React.ReactNode[];
  onNewTransactionAdd: (data: TransactionCreationType) => Promise<boolean>;
  isLoading: boolean;
  transactions: Transaction[];
  isAddingDisabled?: boolean;
  makeRefund: (id: Transaction) => void;
  isRefundDisabled?: boolean;
  addButtonTooltip?: string;
  isRelatedReservationColumnHidden?: boolean;
  isRelatedCertificateColumnHidden?: boolean;
  loadTransactionHistory: (
    transactionId: string
  ) => Promise<ChangesHistoryType>;
};

const TransactionsWindow: React.FC<TransactionsWindowProps> = ({
  isOpen,
  onClose,
  isLoading,
  customContent,
  onNewTransactionAdd,
  isAddingDisabled,
  title = "Информация о транзакиях",
  transactions,
  makeRefund,
  isRefundDisabled,
  addButtonTooltip,
  isRelatedReservationColumnHidden,
  isRelatedCertificateColumnHidden,
  loadTransactionHistory
}) => {
  const [isCreationMode, setIsCreationMode] = React.useState(false);

  const {
    isChangesModalOpen,
    closeChangesModal,
    isChangesLoading,
    loadChangesHistory,
    changesHistory
  } = useChangesHistory((id) => loadTransactionHistory(id as any));

  const addTransaction = async (data: TransactionCreationType) => {
    const newTransaction = await onNewTransactionAdd(data);

    if (newTransaction) {
      setIsCreationMode(false);
      return true;
    }

    return false;
  };

  return (
    <>
      <Modal open={isOpen && !isChangesModalOpen} onClose={onClose}>
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
                  <IconButton
                    onClick={() => setIsCreationMode((prev) => !prev)}
                  >
                    {isCreationMode ? <ArrowBack /> : <Add />}
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {isCreationMode ? (
              <TransactionForm onNewTransactionAdd={addTransaction} />
            ) : (
              <TransactionsTable
                loadTransactionHistory={loadChangesHistory}
                isRefundDisabled={isRefundDisabled}
                makeRefund={makeRefund}
                transactions={transactions}
                isLoading={isLoading}
                title={title}
                customContent={customContent}
                isRelatedCertificateColumnHidden={
                  isRelatedCertificateColumnHidden
                }
                isRelatedReservationColumnHidden={
                  isRelatedReservationColumnHidden
                }
              />
            )}
          </div>
        </div>
      </Modal>
      <Modal open={isChangesModalOpen} onClose={closeChangesModal}>
        <ChangesHistoryModal
          changesHistory={changesHistory}
          isLoading={isChangesLoading}
        />
      </Modal>
    </>
  );
};

export default TransactionsWindow;
