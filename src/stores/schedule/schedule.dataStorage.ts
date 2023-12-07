import {injectable} from "inversify";
import {makeObservable, observable} from "mobx";
import {CashierInfo, Reservation} from "src/types/schedule/schedule.types";

@injectable()
export class ScheduleDataStorage {
  @observable
  reservations: Reservation[] = [];

  @observable
  cashierInfo: CashierInfo | null = null;

  constructor() {
    makeObservable(this);
  }

  setReservations(reservations: Reservation[]) {
    this.reservations = reservations;
  }

  setCashierInfo(cashierInfo: CashierInfo | null) {
    this.cashierInfo = cashierInfo;
  }

  reset() {
    this.cashierInfo = null;
    this.reservations = [];
  }
}
