import {ReservationSearchBodyType} from "src/types/schedule/schedule.dataClient.types";

export const searchPanelDefaultValues: ReservationSearchBodyType = {
  statuses: [],
  rooms: [],
  reservation_id: null,
  telephone: null,
  start_date: null,
  end_date: null,
  created_end_date: null,
  created_start_date: null
};
