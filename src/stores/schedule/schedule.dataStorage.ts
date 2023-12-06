import {injectable} from "inversify";
import {makeObservable, observable} from "mobx";
import {Reservation} from "src/types/shared.types";

@injectable()
export class ScheduleDataStorage {
  @observable
  reservations: Reservation[] = [];

  constructor() {
    makeObservable(this);
  }

  setReservations(reservations: Reservation[]) {
    this.reservations = reservations;
  }
}
