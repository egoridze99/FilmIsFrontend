import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvDataClient} from "src/stores/workspaceEnv/workspaceEnv.dataClient";
import {WorkspaceEnvDataStorage} from "src/stores/workspaceEnv/workspaceEnv.dataStorage";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {ICommonServices} from "src/services/types/common.interface";

@injectable()
export class WorkspaceEnvDataService {
  @inject(TYPES.WorkspaceEnvDataClient)
  private readonly dataClient: WorkspaceEnvDataClient;

  @inject(TYPES.WorkspaceEnvDataStorage)
  private readonly dataStorage: WorkspaceEnvDataStorage;

  @inject(TYPES.CommonServices)
  private readonly commonServices: ICommonServices;

  async loadEnvData() {
    const envData = await this.dataClient.loadEnvData();
    this.dataStorage.setEnvModel(
      new WorkspaceEnvModel(this.commonServices.sessionStorageService, envData)
    );
  }

  reset() {
    this.dataStorage?.envModel?.reset();
    this.dataStorage.setEnvModel(null);
  }
}
