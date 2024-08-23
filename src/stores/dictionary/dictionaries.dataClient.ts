import {injectable} from "inversify";
import {axios} from "src/axios";
import {Cinema, City} from "src/types/shared.types";

@injectable()
export class DictionariesDataClient {
  async loadCinemas() {
    const response = await axios.get<Cinema[]>("/reference/cinemas");

    return response.data;
  }

  async loadCities() {
    const response = await axios.get<City[]>("/reference/cities");

    return response.data;
  }
}
