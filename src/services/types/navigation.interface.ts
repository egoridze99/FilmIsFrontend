import {History} from "history";

export type BeforeNavigateCallbackType = (
  path: string
) => Promise<boolean> | boolean;

/**
 * Сервис для навигации по приложению
 *
 */
export interface INavigationService {
  /**
   * История
   */
  history: History;

  /**
   * Последний посещенный маршрут
   */
  lastVisitedPath: string;

  /**
   * Перейти по указанному пути
   * @param путь
   * @return true, если редирект совершен, иначе false
   */
  navigate: (path: string) => Promise<boolean>;

  /**
   * Перейти на страницу авторизации
   */
  navigateToSignIn: () => void;

  /**
   * Установить значения в query params
   */
  setQueryParams: (
    data: {key: string; value: string}[],
    withNavigate?: boolean
  ) => Promise<boolean>;

  /**
   * Получть все параметры из query string
   */
  getQueryParams(): Record<string, any>;

  /**
   * Удалить значения из query params
   */
  removeQueryParams: (
    data: string[],
    withNavigate?: boolean
  ) => Promise<boolean>;

  /**
   * Перерйти по корневому маршруту
   */
  navigateToRoot: () => void;

  /**
   * Зарегестрировать колбэк который будет вызван перед навигацией.
   * Если все такие колбэки вернут true, то будет совершена навигация
   *
   * Возвращает переданную на вход функцию. Нужна для последующего
   * удаления колбэка
   */
  registerBeforeNavigateHandler: (
    cb: BeforeNavigateCallbackType
  ) => BeforeNavigateCallbackType;

  /**
   * Удалить колбэк который вызывался перед навигацией
   *
   * Вернет true, если колбэк был удален
   */
  removeBeforeNavigateHandler: (cb: BeforeNavigateCallbackType) => boolean;
}
