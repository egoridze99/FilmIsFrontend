import {IStorage} from "src/services/types/storage.interface";
import {isJSON} from "src/utils/isJSON";

export abstract class AbstractStorage implements IStorage {
  protected constructor(private readonly storage: Storage) {}

  setItem(key: string, value: any) {
    const finalValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    this.storage.setItem(key, finalValue);
    return this;
  }

  getItem(key: string) {
    const valueFromLS = this.storage.getItem(key);
    return isJSON(valueFromLS) ? JSON.parse(valueFromLS) : valueFromLS;
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
    return this;
  }

  clear() {
    this.storage.clear();
    return this;
  }
}
