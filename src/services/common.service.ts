import {inject, injectable} from "inversify";
import {ICommonServices} from "src/services/types/common.interface";
import {TYPES} from "src/app/app.types";
import type {INavigationService} from "src/services/types/navigation.interface";
import type {IStorage} from "src/services/types/storage.interface";

@injectable()
export class CommonService implements ICommonServices {
  @inject(TYPES.NavigationService)
  readonly navigationService: INavigationService;

  @inject(TYPES.LocalStorageService)
  readonly localStorageService: IStorage;

  @inject(TYPES.LocalStorageService)
  readonly sessionStorageService: IStorage;
}
