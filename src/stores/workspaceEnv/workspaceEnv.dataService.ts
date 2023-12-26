import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvDataStorage} from "src/stores/workspaceEnv/workspaceEnv.dataStorage";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {ICommonServices} from "src/services/types/common.interface";
import {Cinema} from "src/types/shared.types";

@injectable()
export class WorkspaceEnvDataService {
  @inject(TYPES.WorkspaceEnvDataStorage)
  private readonly dataStorage: WorkspaceEnvDataStorage;

  @inject(TYPES.CommonServices)
  private readonly commonServices: ICommonServices;

  async loadEnvData(cinemas: Cinema[]) {
    this.dataStorage.setEnvModel(
      new WorkspaceEnvModel(this.commonServices.sessionStorageService, cinemas)
    );
  }

  reset() {
    this.dataStorage?.envModel?.reset();
    this.dataStorage.setEnvModel(null);
  }
}
