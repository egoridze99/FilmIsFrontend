import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {DictionariesDataService} from "src/stores/dictionary/dictionaries.dataService";
import {action, computed, makeObservable, observable} from "mobx";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {INotificationService} from "src/services/types/notification.interface";
import {DictionariesEnum} from "src/types/core.types";

@injectable()
export class DictionariesRepository {
  @inject(TYPES.DictionariesDataService)
  @observable
  private readonly dataService: DictionariesDataService;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @observable
  loaders = {
    cinemaDictionary: false,
    cityDictionary: false
  };

  constructor() {
    makeObservable(this);
  }

  @computed get cityDictionary() {
    return this.dataService.storage.cityDictionary;
  }

  @computed get cinemaDictionary() {
    return this.dataService.storage.cinemaDictionary;
  }

  @action async loadCityDictionary() {
    try {
      this.loaders.cityDictionary = true;
      await this.dataService.loadCitiDictionary();
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.loaders.cityDictionary = false;
    }
  }

  @action async loadCinemaDictionary() {
    try {
      this.loaders.cinemaDictionary = true;
      await this.dataService.loadCinemaDictionary();
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.loaders.cinemaDictionary = false;
    }
  }

  @action async resetDictionary(type: DictionariesEnum) {
    switch (type) {
      case DictionariesEnum.CinemaDictionary:
        this.dataService.storage.setCinemaDictionary(null);
        break;
      case DictionariesEnum.CityDictionary:
        this.dataService.storage.setCityDictionary(null);
        break;
      default:
        return;
    }
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }
}
