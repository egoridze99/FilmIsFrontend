import {action, makeObservable, observable} from "mobx";
import {
  TransactionRawType,
  TransactionStatusEnum,
  TransactionTypeEnum
} from "src/types/transactions/transactions.types";
import moment, {Moment} from "moment";
import {UserInfoData} from "src/types/shared.types";

const baseFields = [
  "id",
  "sum",
  "alias",
  "description",
  "author",
  "transaction_type",
  "transaction_status"
];

export class Transaction {
  readonly id: string;
  readonly created_at: Moment;
  readonly sum: number;
  readonly alias: string | null;
  readonly description: string | null;
  readonly author: UserInfoData;
  readonly transaction_type: TransactionTypeEnum;

  @observable
  transaction_status: TransactionStatusEnum;

  constructor(initializationData: TransactionRawType) {
    makeObservable(this);

    baseFields.forEach((field) => {
      this[field] = initializationData[field];
    });

    this.created_at = moment(initializationData.created_at, "DD-MM-YYYY HH:mm");
  }

  @action
  updateStatus(status: TransactionStatusEnum) {
    this.transaction_status = status;
  }
}
