import {injectable} from "inversify";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {action, makeObservable, observable} from "mobx";

@injectable()
export class WorkspaceEnvDataStorage {
  @observable
  envModel: WorkspaceEnvModel | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  setEnvModel(model: WorkspaceEnvModel | null) {
    this.envModel = model;
  }
}
