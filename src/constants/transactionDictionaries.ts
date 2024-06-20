import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "src/types/transactions/transactions.types";

export const transactionStatusDictionary = {
  [TransactionStatusEnum.pending]: "Ожидает платежа",
  [TransactionStatusEnum.completed]: "Завершено",
  [TransactionStatusEnum.rejected]: "Отменено системой",
  [TransactionStatusEnum.refunded]: "Возврат средств"
};

export const transactionTypeDictionary = {
  [TransactionTypeEnum.cash]: "Наличные",
  [TransactionTypeEnum.card]: "Карта",
  [TransactionTypeEnum.sbp]: "СБП"
};
