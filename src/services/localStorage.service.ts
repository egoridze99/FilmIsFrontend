import {injectable} from "inversify";
import {AbstractStorage} from "src/services/abstracts/storage.abstract";

@injectable()
export class LocalStorageService extends AbstractStorage {
  constructor() {
    super(window.localStorage);
  }
}
