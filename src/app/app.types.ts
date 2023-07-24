export const TYPES = {
  /**
   * Сервисы
   */
  NavigationService: Symbol.for("NavigationService"),
  LocalStorageService: Symbol.for("LocalStorageService"),
  SessionStorageService: Symbol.for("SessionStorageService"),
  AuthenticationService: Symbol.for("AuthenticationService"),

  CommonServices: Symbol.for("CommonServices"),

  /**
   * Расписание сеансов
   */
  ScheduleDataClient: Symbol.for("ScheduleDataClient")
};
