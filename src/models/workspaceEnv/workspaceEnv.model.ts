import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction
} from "mobx";
import {Cinema, Room} from "src/types/shared.types";
import {IStorage} from "src/services/types/storage.interface";
import {
  CURRENT_CINEMA_ID,
  CURRENT_DATE,
  CURRENT_ROOM_ID
} from "src/constants/storageKeys";
import moment from "moment";
import {DATE_FORMAT} from "src/constants/date";
import {convertArrayToDict} from "src/utils/convertArrayToDict";

export class WorkspaceEnvModel {
  cinemas: Cinema[];

  @observable cinema: Cinema;
  @observable room: Room | null;
  @observable date: Date;

  reactionDisposers: IReactionDisposer[] = [];

  constructor(
    private readonly storage: IStorage,
    cinemas: Cinema[]
  ) {
    makeObservable(this);

    this.cinemas = cinemas;

    this.registerReactions();

    const currentCinemaId = storage.getItem(CURRENT_CINEMA_ID);
    const cinema = cinemas.find((c) => c.id === currentCinemaId);
    if (!cinema) {
      this.cinema = cinemas[0];
    } else {
      this.cinema = cinema;
    }

    const currentRoomId = storage.getItem(CURRENT_ROOM_ID);
    const room = this.cinema.rooms.find((r) => r.id === currentRoomId);
    if (!room) {
      this.room = this.cinema.rooms[0];
    } else {
      this.room = room;
    }

    const currentDate = storage.getItem(CURRENT_DATE);
    if (currentDate) {
      this.date = moment(currentDate, DATE_FORMAT).toDate();
    } else {
      this.date = new Date();
    }
  }

  @computed get cinemasAsDict() {
    return convertArrayToDict(this.cinemas, "id");
  }

  @computed get roomsInCurrentCinemaAsDict() {
    return convertArrayToDict(this.cinema.rooms, "id");
  }

  @action setCinema(cinema: Cinema) {
    this.cinema = cinema;
    this.setRoom(cinema.rooms[0]);
  }

  @action setRoom(room: Room | null) {
    this.room = room;
  }

  @action setDate(date: Date) {
    this.date = date;
  }

  @action reset() {
    this.reactionDisposers.forEach((rd) => rd());
    this.reactionDisposers = [];

    this.storage.removeItem(CURRENT_CINEMA_ID);
    this.storage.removeItem(CURRENT_ROOM_ID);
    this.storage.removeItem(CURRENT_DATE);
  }

  private registerReactions() {
    this.reactionDisposers.push(
      reaction(
        () => this.cinema,
        () => {
          this.storage.setItem(CURRENT_CINEMA_ID, this.cinema.id.toString());
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => this.room,
        () => {
          this.storage.setItem(
            CURRENT_ROOM_ID,
            this?.room?.id?.toString() || "-1"
          );
        }
      )
    );

    this.reactionDisposers.push(
      reaction(
        () => this.date,
        () => {
          this.storage.setItem(
            CURRENT_DATE,
            moment(this.date).format(DATE_FORMAT)
          );
        }
      )
    );
  }
}
