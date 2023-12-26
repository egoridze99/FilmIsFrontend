import {computed, makeObservable, observable} from "mobx";
import {Cinema} from "src/types/shared.types";
import {convertArrayToDict} from "src/utils/convertArrayToDict";

export class CinemaDictionary {
  @observable
  cinemas: Cinema[] = [];

  constructor(cinemas: Cinema[]) {
    makeObservable(this);
    this.cinemas = cinemas;
  }

  @computed get cinemasAsDict() {
    return convertArrayToDict(this.cinemas, "id");
  }
}
