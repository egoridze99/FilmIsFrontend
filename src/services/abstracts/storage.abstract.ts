import {IStorage} from "src/services/types/storage.interface";
import {isJSON} from "src/utils/isJSON";
import {injectable, unmanaged} from "inversify";

@injectable()
export class AbstractStorage implements IStorage {
  constructor(@unmanaged() private readonly storage: Storage) {}

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
