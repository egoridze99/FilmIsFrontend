import "reflect-metadata";

import {AppContainer} from "src/app/containers/app.container";
import {ScheduleContainer} from "src/app/containers/schedule.container";
import {TYPES} from "src/app/app.types";
import {ICommonServices} from "src/services/types/common.interface";
import {WorkspaceEnvContainer} from "src/app/containers/workspaceEnv.container";
import {WorkspaceEnvRepository} from "src/stores/workspaceEnv/workspaceEnv.repository";
import {ScheduleRepository} from "src/stores/schedule/schedule.repository";
import {CertificatesContainer} from "src/app/containers/certificates.container";
import {CertificatesRepository} from "src/stores/certificates/certificates.repository";
import {DictionariesContainer} from "src/app/containers/dictionaries.container";
import {DictionariesRepository} from "src/stores/dictionary/dictionaries.repository";
import {QueueContainer} from "src/app/containers/queue.container";
import {QueueRepository} from "src/stores/queue/queue.repository";

/**
 * Сервисы
 */
const appContainer = new AppContainer();
export const commonServices = appContainer.get<ICommonServices>(
  TYPES.CommonServices
);

const dictionariesContainer = new DictionariesContainer();
dictionariesContainer.parent = appContainer;
export const dictionaries = dictionariesContainer.get<DictionariesRepository>(
  TYPES.DictionariesRepository
);

/**
 * Окружение рабочего места администратора
 */
const workspaceEnvContainer = new WorkspaceEnvContainer();
workspaceEnvContainer.parent = appContainer;
export const workspaceEnv = workspaceEnvContainer.get<WorkspaceEnvRepository>(
  TYPES.WorkspaceEnvRepository
);

/**
 * Расписание сеансов
 */
const scheduleContainer = new ScheduleContainer();
scheduleContainer.parent = appContainer;
export const schedule = scheduleContainer.get<ScheduleRepository>(
  TYPES.ScheduleRepository
);

/**
 * Сертификаты
 */
const certificatesContainer = new CertificatesContainer();
certificatesContainer.parent = appContainer;
export const certificates = certificatesContainer.get<CertificatesRepository>(
  TYPES.CertificatesRepository
);

/**
 * Сертификаты
 */
const queueContainer = new QueueContainer();
queueContainer.parent = appContainer;
export const queue = queueContainer.get<QueueRepository>(TYPES.QueueRepository);
