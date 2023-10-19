import {action, makeObservable, observable} from "mobx";
import {Cinema, Room} from "src/types/workspace.types";
import {IStorage} from "src/services/types/storage.interface";
import {
  CURRENT_CINEMA_ID,
  CURRENT_DATE,
  CURRENT_ROOM_ID
} from "src/constants/storageKeys";
import moment from "moment";
import {DATE_FORMAT} from "src/constants/date";

export class WorkspaceEnvModel {
  cinemas: Cinema[];

  @observable cinema: Cinema;
  @observable room: Room;
  @observable date: Date;

  constructor(
    private readonly storage: IStorage,
    cinemas: Cinema[]
  ) {
    makeObservable(this);

    this.cinemas = cinemas;

    const currentCinemaId = storage.getItem(CURRENT_CINEMA_ID);
    const cinema = cinemas.find((c) => c.id === currentCinemaId);
    if (!cinema) {
      this.cinema = cinemas[0];
    } else {
      this.cinema = cinema;
    }
    this.storage.setItem(CURRENT_CINEMA_ID, this.cinema.id.toString());

    const currentRoomId = storage.getItem(CURRENT_ROOM_ID);
    const room = this.cinema.rooms.find((r) => r.id === currentRoomId);
    if (!room) {
      this.room = this.cinema.rooms[0];
    } else {
      this.room = room;
    }
    this.storage.setItem(CURRENT_ROOM_ID, this.room.id.toString());

    const currentDate = storage.getItem(CURRENT_DATE);
    if (currentDate) {
      this.date = moment(currentDate, DATE_FORMAT).toDate();
    } else {
      this.date = new Date();
    }
    this.storage.setItem(CURRENT_DATE, moment(this.date).format(DATE_FORMAT));
  }

  @action
  reset() {
    this.storage.removeItem(CURRENT_CINEMA_ID);
    this.storage.removeItem(CURRENT_ROOM_ID);
    this.storage.removeItem(CURRENT_DATE);
  }
}
