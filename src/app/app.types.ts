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
  ScheduleDataClient: Symbol.for("ScheduleDataClient"),
  ScheduleDataService: Symbol.for("ScheduleDataService"),
  ScheduleRepository: Symbol.for("ScheduleRepository"),

  /**
   * WorkspaceEnv
   */
  WorkspaceEnvDataClient: Symbol.for("WorkspaceEnvDataClient"),
  WorkspaceEnvDataService: Symbol.for("WorkspaceEnvDataService"),
  WorkspaceEnvDataStorage: Symbol.for("WorkspaceEnvDataStorage"),
  WorkspaceEnvRepository: Symbol.for("WorkspaceEnvRepository")
};
