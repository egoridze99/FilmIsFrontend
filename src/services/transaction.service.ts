import moment, {Moment} from "moment";
import {axios} from "src/axios";
import {DATE_FORMAT, DATETIME_FORMAT} from "src/constants/date";
import {inject, injectable} from "inversify";
import {
  TransactionCreationType,
  TransactionRawType,
  TransactionStatusEnum
} from "src/types/transactions/transactions.types";
import {TYPES} from "src/app/app.types";
import {INotificationService} from "src/services/types/notification.interface";
import {action, makeObservable, observable} from "mobx";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {Transaction} from "src/models/transactions/transaction.model";
import {CashierInfo} from "src/types/shared.types";
import {ChangesResponseType} from "src/types/core.types";
import {historyKeysDictionary} from "src/services/constants/transaction.service.constants";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import {ReservationStatus} from "src/types/schedule/schedule.types";
import {transactionStatusDictionary} from "src/constants/transactionDictionaries";

@injectable()
export class TransactionService {
  @observable
  cashierInfo: CashierInfo | null = null;

  constructor() {
    makeObservable(this);
  }

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  async loadCinemaTransactions(cinemaId: number, date: Moment) {
    try {
      const response = await axios.get<TransactionRawType[]>(
        `/transactions/cinema/${cinemaId}`,
        {params: {date: moment(date).format(DATE_FORMAT)}}
      );

      return this.createTransactionModelsFromRawData(response.data);
    } catch (e) {
      this.baseErrorHandler(e);
      return [];
    }
  }

  async loadReservationTransactions(reservationId: number) {
    try {
      const response = await axios.get<TransactionRawType[]>(
        `/transactions/reservation/${reservationId}`
      );

      return this.createTransactionModelsFromRawData(response.data);
    } catch (e) {
      this.baseErrorHandler(e);
      return [];
    }
  }

  async loadCertificateTransactions(certificateId: number) {
    try {
      const response = await axios.get<TransactionRawType[]>(
        `/transactions/certificate/${certificateId}`
      );

      return this.createTransactionModelsFromRawData(response.data);
    } catch (e) {
      this.baseErrorHandler(e);
      return [];
    }
  }

  async createTransaction(
    data: TransactionCreationType,
    identifierObject: {reservation_id?: number; cinema_id?: number}
  ) {
    try {
      const response = await axios.post<TransactionRawType>(`/transactions`, {
        ...data,
        ...identifierObject
      });

      return new Transaction(response.data);
    } catch (e) {
      this.baseErrorHandler(e);
      return null;
    }
  }

  async makeRefund(transaction: Transaction): Promise<boolean> {
    try {
      await axios.post(`/transactions/refund/${transaction.id}`);

      transaction.updateStatus(TransactionStatusEnum.refunded);

      return true;
    } catch (e) {
      this.baseErrorHandler(e);
      return false;
    }
  }

  async loadTransactionChangesLog(transactionId: string) {
    try {
      const rawChanges = await axios.get<ChangesResponseType<any>[]>(
        `/transactions/logs`,
        {
          params: {
            transaction_id: transactionId
          }
        }
      );

      return rawChanges.data.map((item) => {
        const copy = {...item} as any;

        return {
          author: item.author,
          created_at: moment(item.created_at, DATETIME_FORMAT),
          id: item.id,
          data: Object.keys(item.new).reduce((acc, key) => {
            let wasChanged = copy.new[key] !== copy.old[key];

            if (key === "transaction_status") {
              copy.new.transaction_status =
                transactionStatusDictionary[
                  copy.new.transaction_status as TransactionStatusEnum
                ];
              copy.old.transaction_status =
                transactionStatusDictionary[
                  copy.old.transaction_status as TransactionStatusEnum
                ];
            }

            if (wasChanged) {
              acc[historyKeysDictionary[key]] = {
                new: copy.new[key],
                old: copy.old[key]
              };
            }

            return acc;
          }, {})
        };
      });
    } catch (e) {
      this.baseErrorHandler(e);
      return null;
    }
  }

  @action
  async loadCashierInfo(cinemaId: number, date: Moment) {
    this.cashierInfo = null;

    const response = await axios.get<CashierInfo>("/money", {
      params: {
        cinema_id: cinemaId,
        date: date.format(DATE_FORMAT)
      }
    });

    this.cashierInfo = response.data;
  }

  @action
  async clearCashierInfo() {
    this.cashierInfo = null;
  }

  private createTransactionModelsFromRawData(
    transactions: TransactionRawType[]
  ) {
    return transactions.map((transaction) => new Transaction(transaction));
  }

  private baseErrorHandler(e) {
    console.log(e);
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }
}
