import {INavigationService} from "src/services/types/navigation.interface";
import {IStorage} from "src/services/types/storage.interface";
import {IAuthenticationService} from "src/services/types/authentication.interface";
import {INotificationService} from "src/services/types/notification.interface";

export interface ICommonServices {
  navigationService: INavigationService;
  localStorageService: IStorage;
  sessionStorageService: IStorage;
  authenticationService: IAuthenticationService;
  notificationService: INotificationService;
}
