import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {DictionariesDataService} from "src/stores/dictionary/dictionaries.dataService";
import {action, computed, makeObservable, observable} from "mobx";
import {commonErrorText} from "src/constants/notifications";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {INotificationService} from "src/services/types/notification.interface";

@injectable()
export class DictionariesRepository {
  @inject(TYPES.DictionariesDataService)
  @observable
  private readonly dataService: DictionariesDataService;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  @observable
  loaders = {
    cinemaDictionary: false
  };

  constructor() {
    makeObservable(this);
  }

  @computed get cinemaDictionary() {
    return this.dataService.storage.cinemaDictionary;
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

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }
}
