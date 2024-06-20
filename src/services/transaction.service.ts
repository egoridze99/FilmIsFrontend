import moment, {Moment} from "moment";
import {axios} from "src/axios";
import {DATE_FORMAT} from "src/constants/date";
import {inject, injectable} from "inversify";
import {
  TransactionCreationType,
  TransactionRawType,
  TransactionStatusEnum
} from "src/types/transactions/transactions.types";
import {TYPES} from "src/app/app.types";
import {INotificationService} from "src/services/types/notification.interface";
import {CashierInfo} from "src/types/schedule/schedule.types";
import {action, makeObservable, observable} from "mobx";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {Transaction} from "src/models/transactions/transaction.model";

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

  @action
  async loadCashierInfo(cinemaId: number, date: Moment) {
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
