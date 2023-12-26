import {injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";

@injectable()
export class DictionaryDataStorage {
  @observable
  cinemaDictionary: CinemaDictionary | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  setCinemaDictionary(cinemaDictionary: CinemaDictionary) {
    this.cinemaDictionary = cinemaDictionary;
  }
}
