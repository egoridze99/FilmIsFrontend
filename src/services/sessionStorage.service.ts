import {AbstractStorage} from "src/services/abstracts/storage.abstract";
import {injectable} from "inversify";

@injectable()
export class SessionStorageService extends AbstractStorage {
  constructor() {
    super(window.sessionStorage);
  }
}
