import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvDataService} from "src/stores/workspaceEnv/workspaceEnv.dataService";
import {WorkspaceEnvDataStorage} from "src/stores/workspaceEnv/workspaceEnv.dataStorage";
import {WorkspaceEnvRepository} from "src/stores/workspaceEnv/workspaceEnv.repository";

export class WorkspaceEnvContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind<WorkspaceEnvDataService>(TYPES.WorkspaceEnvDataService).to(
      WorkspaceEnvDataService
    );
    this.bind<WorkspaceEnvDataStorage>(TYPES.WorkspaceEnvDataStorage).to(
      WorkspaceEnvDataStorage
    );
    this.bind<WorkspaceEnvRepository>(TYPES.WorkspaceEnvRepository).to(
      WorkspaceEnvRepository
    );
  }
}
