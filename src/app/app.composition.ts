import "reflect-metadata";

import {AppContainer} from "src/app/containers/app.container";
import {ScheduleContainer} from "src/app/containers/schedule.container";
import {TYPES} from "src/app/app.types";
import {ICommonServices} from "src/services/types/common.interface";
import {WorkspaceEnvContainer} from "src/app/containers/workspaceEnv.container";
import {WorkspaceEnvRepository} from "src/stores/workspaceEnv/workspaceEnv.repository";
import {ScheduleRepository} from "src/stores/schedule/schedule.repository";

/**
 * Сервисы
 */
const appContainer = new AppContainer();
export const commonServices = appContainer.get<ICommonServices>(
  TYPES.CommonServices
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
