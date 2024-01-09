import {QueueSearchBodyType} from "src/types/queue/queue.dataClient.types";

export const searchPanelDefaultValues: QueueSearchBodyType = {
  status: [],
  room: [],
  ids: "",
  telephones: "",
  start_date: null,
  end_date: null,
  has_another_reservation: []
};
