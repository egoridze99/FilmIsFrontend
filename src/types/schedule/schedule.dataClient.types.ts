import {Room} from "src/types/shared.types";

export type ReservationCreationBodyType = {
  room: Room;
  date: string;
  time: string;
  duration: number;
  count: number;
  guest: {
    name: string;
    tel: string;
  };
  film: string | null;
  rent: number | null;
  note: string | null;
  certificate_ident: string | null;
};
