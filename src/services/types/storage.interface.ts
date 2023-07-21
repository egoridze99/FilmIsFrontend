export interface IStorage {
  /**
   * Установить параметр по ключу
   * @param key ключ
   */
  setItem: (key: string, value: string) => void;

  /**
   * Получить параметр по ключу
   * @param key ключ
   */
  getItem: (key: string) => any | null;

  /**
   * Удалить параметр из LS по ключу
   * @param key ключ
   */
  removeItem: (key: string) => void;

  /**
   * Очистить LS
   */
  clear: () => void;
}
