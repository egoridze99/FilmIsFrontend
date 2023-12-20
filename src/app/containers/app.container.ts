import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import NavigationService from "src/services/navigation.service";
import {INavigationService} from "src/services/types/navigation.interface";
import {LocalStorageService} from "src/services/localStorage.service";
import {IStorage} from "src/services/types/storage.interface";
import {SessionStorageService} from "src/services/sessionStorage.service";
import {CommonService} from "src/services/common.service";
import {ICommonServices} from "src/services/types/common.interface";
import {AuthenticationService} from "src/services/authentication.service";
import {IAuthenticationService} from "src/services/types/authentication.interface";
import {INotificationService} from "src/services/types/notification.interface";
import {NotificationService} from "src/services/notification.service";

export class AppContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton", skipBaseClassChecks: true});

    this.bind<INavigationService>(TYPES.NavigationService).to(
      NavigationService
    );
    this.bind<IStorage>(TYPES.LocalStorageService).to(LocalStorageService);
    this.bind<IStorage>(TYPES.SessionStorageService).to(SessionStorageService);
    this.bind<IAuthenticationService>(TYPES.AuthenticationService).to(
      AuthenticationService
    );
    this.bind<INotificationService>(TYPES.NotificationService).to(
      NotificationService
    );

    this.bind<ICommonServices>(TYPES.CommonServices).to(CommonService);
  }
}
