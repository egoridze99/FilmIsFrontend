export const TYPES = {
  /**
   * Сервисы
   */
  NavigationService: Symbol.for("NavigationService"),
  LocalStorageService: Symbol.for("LocalStorageService"),
  SessionStorageService: Symbol.for("SessionStorageService"),
  AuthenticationService: Symbol.for("AuthenticationService"),
  NotificationService: Symbol.for("NotificationService"),

  CommonServices: Symbol.for("CommonServices"),

  /**
   * Бизнесовые сервисы
   */
  CustomerService: Symbol.for("CustomerService"),
  TransactionService: Symbol.for("TransactionService"),

  /**
   * Справочники
   */
  DictionariesDataClient: Symbol.for("DictionariesDataClient"),
  DictionariesDataService: Symbol.for("DictionariesDataService"),
  DictionariesDataStorage: Symbol.for("DictionariesDataStorage"),
  DictionariesRepository: Symbol.for("DictionariesRepository"),

  /**
   * Расписание сеансов
   */
  ScheduleDataClient: Symbol.for("ScheduleDataClient"),
  ScheduleDataService: Symbol.for("ScheduleDataService"),
  ScheduleRepository: Symbol.for("ScheduleRepository"),

  /**
   * Сертификаты
   */
  CertificatesDataClient: Symbol.for("CertificatesDataClient"),
  CertificatesDataService: Symbol.for("CertificatesDataService"),
  CertificatesRepository: Symbol.for("CertificatesRepository"),

  /**
   * Очередь
   */
  QueueDataClient: Symbol.for("QueueDataClient"),
  QueueDataService: Symbol.for("QueueDataService"),
  QueueRepository: Symbol.for("QueueRepository"),

  /**
   * Админ
   */
  AdminDataClient: Symbol.for("AdminDataClient"),
  AdminRepository: Symbol.for("AdminRepository"),

  /**
   * WorkspaceEnv
   */
  WorkspaceEnvDataClient: Symbol.for("WorkspaceEnvDataClient"),
  WorkspaceEnvDataService: Symbol.for("WorkspaceEnvDataService"),
  WorkspaceEnvDataStorage: Symbol.for("WorkspaceEnvDataStorage"),
  WorkspaceEnvRepository: Symbol.for("WorkspaceEnvRepository")
};
