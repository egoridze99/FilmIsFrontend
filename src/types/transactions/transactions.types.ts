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
  related_reservation_id: number | null;
  related_certificate_id: string | null;
  is_refund_available: boolean;
  payment_url: string | null;
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
