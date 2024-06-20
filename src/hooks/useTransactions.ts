import React from "react";
import {Reservation} from "src/types/schedule/schedule.types";
import {Transaction} from "src/models/transactions/transaction.model";
import {Certificate} from "src/types/shared.types";

export const useTransactions = (
  loadTransactions:
    | ((id: number) => Promise<Transaction[]>)
    | (() => Promise<Transaction[]>)
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] =
    React.useState(false);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const [activeItem, setActiveItem] = React.useState<
    Reservation | Certificate | null
  >(null);

  const _isOpen = React.useRef<boolean>(false);

  const onLoadTransactions = async (item?: Reservation | Certificate) => {
    setIsLoading(true);
    setIsTransactionModalOpen(true);
    item && setActiveItem(item);
    _isOpen.current = true;

    const transactions = await loadTransactions(item?.id as number);

    if (_isOpen.current) {
      setTransactions(transactions);
    }

    setIsLoading(false);
  };

  const closeTransactionsModal = () => {
    setTransactions([]);
    setIsTransactionModalOpen(false);
    setIsLoading(false);
    setActiveItem(null);
    _isOpen.current = false;
  };

  return {
    itemInTransactionWindow: activeItem,
    isTransactionsLoading: isLoading,
    isTransactionsModalOpen: isTransactionModalOpen,
    transactions,
    addTransactionToList: (transaction: Transaction) =>
      setTransactions((prev) => [...prev, transaction]),
    loadTransactions: onLoadTransactions,
    closeTransactionsModal
  };
};
