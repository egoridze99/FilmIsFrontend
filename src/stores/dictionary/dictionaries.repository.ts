import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {DictionariesDataService} from "src/stores/dictionary/dictionaries.dataService";
import {action, computed, makeObservable, observable} from "mobx";

@injectable()
export class DictionariesRepository {
  @inject(TYPES.DictionariesDataService)
  @observable
  private readonly dataService: DictionariesDataService;

  constructor() {
    makeObservable(this);
  }

  @computed get cinemaDictionary() {
    return this.dataService.storage.cinemaDictionary;
  }

  @action async loadCinemaDictionary() {
    return this.dataService.loadCinemaDictionary();
  }
}
