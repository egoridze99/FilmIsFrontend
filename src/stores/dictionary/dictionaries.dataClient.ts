import {injectable} from "inversify";
import {axios} from "src/axios";
import {Cinema} from "src/types/shared.types";

@injectable()
export class DictionariesDataClient {
  async loadCinemas() {
    const response = await axios.get<Cinema[]>("/reference/cinemas");

    return response.data;
  }
}
