import {computed, makeObservable, observable} from "mobx";
import {City} from "src/types/shared.types";
import {convertArrayToDict} from "src/utils/convertArrayToDict";

export class CityDictionary {
  @observable
  cities: City[] = [];

  constructor(cities: City[]) {
    makeObservable(this);
    this.cities = cities;
  }

  @computed get citiesAsDict() {
    return convertArrayToDict(this.cities, "id");
  }
}
