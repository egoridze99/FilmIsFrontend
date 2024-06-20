import {Moment} from "moment/moment";
import {UserInfoData} from "src/types/shared.types";

export type TransactionCreationType = {
  sum: number;
  description: string | null;
  transaction_type: TransactionTypeEnum;
};

export type TransactionRawType = {
  id: string;
  created_at: Moment;
  sum: number;
  alias?: string;
  description?: string;
  author: UserInfoData;
  transaction_type: TransactionTypeEnum;
  transaction_status: TransactionStatusEnum;
};

export enum TransactionTypeEnum {
  cash = "cash",
  card = "card",
  sbp = "sbp"
}

export enum TransactionStatusEnum {
  pending = "pending",
  rejected = "rejected",
  completed = "completed",
  refunded = "refunded"
}
