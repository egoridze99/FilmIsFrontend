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
import {AdminContainer} from "src/app/containers/admin.container";
import {AdminRepository} from "src/stores/admin/admin.repository";
import {CustomerContainer} from "src/app/containers/customer.container";
import {CustomerService} from "src/services/customer.service";
import {Container} from "inversify";
import {TransactionContainer} from "src/app/containers/transactionContainer";
import {TransactionService} from "src/services/transaction.service";

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
 * Бизнесовые сервисы
 */
export const customerServiceContainer = new CustomerContainer();
customerServiceContainer.parent = appContainer;

export const customerService = customerServiceContainer.get<CustomerService>(
  TYPES.CustomerService
);

export const transactionsServiceContainer = new TransactionContainer();
transactionsServiceContainer.parent = appContainer;

export const transactionService =
  transactionsServiceContainer.get<TransactionService>(
    TYPES.TransactionService
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
const baseScheduleContainer = new ScheduleContainer();
const scheduleContainer = Container.merge(
  baseScheduleContainer,
  customerServiceContainer,
  transactionsServiceContainer
);
scheduleContainer.parent = appContainer;
export const schedule = scheduleContainer.get<ScheduleRepository>(
  TYPES.ScheduleRepository
);

/**
 * Сертификаты
 */
const baseCertificatesContainer = new CertificatesContainer();
const certificatesContainer = Container.merge(
  baseCertificatesContainer,
  customerServiceContainer,
  transactionsServiceContainer
);
certificatesContainer.parent = appContainer;
export const certificates = certificatesContainer.get<CertificatesRepository>(
  TYPES.CertificatesRepository
);

/**
 * Очередь
 */
const baseQueueContainer = new QueueContainer();
const queueContainer = Container.merge(
  baseQueueContainer,
  customerServiceContainer
);
queueContainer.parent = appContainer;
export const queue = queueContainer.get<QueueRepository>(TYPES.QueueRepository);

/**
 * Админка
 */
const adminContainer = new AdminContainer();
adminContainer.parent = appContainer;
export const admin = adminContainer.get<AdminRepository>(TYPES.AdminRepository);
