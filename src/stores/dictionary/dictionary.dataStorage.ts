import {injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";
import {CityDictionary} from "src/models/dictionaries/city.dictionary.model";

@injectable()
export class DictionaryDataStorage {
  @observable
  cinemaDictionary: CinemaDictionary | null = null;

  @observable
  cityDictionary: CityDictionary | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  setCinemaDictionary(cinemaDictionary: CinemaDictionary | null) {
    this.cinemaDictionary = cinemaDictionary;
  }

  @action
  setCityDictionary(cityDictionary: CityDictionary | null) {
    this.cityDictionary = cityDictionary;
  }
}
