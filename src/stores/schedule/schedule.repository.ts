import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {ScheduleDataService} from "src/stores/schedule/schedule.dataService";
import {computed} from "mobx";
import {Reservation} from "src/types/schedule/schedule.types";
import {sortBy} from "ramda";
import moment from "moment";
import {ReservationCreationBodyType} from "src/types/schedule/schedule.dataClient.types";
import {WorkspaceEnvRepository} from "src/stores/workspaceEnv/workspaceEnv.repository";

@injectable()
export class ScheduleRepository {
  @inject(TYPES.ScheduleDataService)
  private readonly dataService: ScheduleDataService;

  @computed
  get reservations(): Reservation[] {
    return sortBy(
      (reservation) =>
        moment(
          `${reservation.date} ${reservation.time}`,
          "DD-MM-YYYY hh:mm"
        ).toDate(),
      this.dataService.dataStorage.reservations
    );
  }

  @computed
  get cashierInfo() {
    return this.dataService.dataStorage.cashierInfo;
  }

  async createReservation(data: ReservationCreationBodyType): Promise<boolean> {
    try {
      await this.dataService.createReservation(data);
      return true;
    } catch (e) {
      return false;
    }
  }

  loadData(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    this.dataService.loadReservations(env.cinema.id, env.room?.id, env.date);
  }

  loadCashierInfo(env: WorkspaceEnvModel | null) {
    if (!env) {
      return;
    }

    this.dataService.loadCashierInfo(env.cinema.id, env.date);
  }

  reset() {
    this.dataService.dataStorage.reset();
  }
}
