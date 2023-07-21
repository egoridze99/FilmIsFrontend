import "reflect-metadata";

import {AppContainer} from "src/app/containers/app.container";
import {ScheduleContainer} from "src/app/containers/schedule.container";
import {TYPES} from "src/app/app.types";
import {ScheduleDataClient} from "src/stores/schedule/schedule.dataClient";
import {ICommonServices} from "src/services/types/common.interface";

/**
 * Сервисы
 */
const appContainer = new AppContainer();
export const commonServices = appContainer.get<ICommonServices>(
  TYPES.CommonServices
);
/**
 * Расписание сеансов
 */
const scheduleContainer = new ScheduleContainer();
scheduleContainer.parent = appContainer;
export const scheduleDataClient = scheduleContainer.get<ScheduleDataClient>(
  TYPES.ScheduleDataClient
);
