import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {DictionaryDataStorage} from "src/stores/dictionary/dictionary.dataStorage";
import {DictionariesDataClient} from "src/stores/dictionary/dictionaries.dataClient";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";
import {CityDictionary} from "src/models/dictionaries/city.dictionary.model";

@injectable()
export class DictionariesDataService {
  @inject(TYPES.DictionariesDataStorage)
  readonly storage: DictionaryDataStorage;

  @inject(TYPES.DictionariesDataClient)
  private readonly dataClient: DictionariesDataClient;

  async loadCinemaDictionary() {
    if (this.storage.cinemaDictionary) {
      return;
    }

    const cinemas = await this.dataClient.loadCinemas();
    const dict = new CinemaDictionary(cinemas);
    this.storage.setCinemaDictionary(dict);
  }

  async loadCitiDictionary() {
    if (this.storage.cityDictionary) {
      return;
    }

    const cities = await this.dataClient.loadCities();
    const dict = new CityDictionary(cities);
    this.storage.setCityDictionary(dict);
  }
}
