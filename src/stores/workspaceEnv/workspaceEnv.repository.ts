import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {WorkspaceEnvDataService} from "src/stores/workspaceEnv/workspaceEnv.dataService";
import {WorkspaceEnvDataStorage} from "src/stores/workspaceEnv/workspaceEnv.dataStorage";
import {computed, makeObservable, observable} from "mobx";
import {Cinema} from "src/types/shared.types";

@injectable()
export class WorkspaceEnvRepository {
  @observable isLoading: boolean = false;

  @inject(TYPES.WorkspaceEnvDataService)
  private readonly dataService: WorkspaceEnvDataService;

  @inject(TYPES.WorkspaceEnvDataStorage)
  @observable
  private readonly dataStorage: WorkspaceEnvDataStorage;

  constructor() {
    makeObservable(this);
  }

  @computed
  get envModel() {
    return this.dataStorage.envModel;
  }

  async loadData(cinemas: Cinema[]) {
    this.isLoading = true;

    try {
      await this.dataService.loadEnvData(cinemas);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.dataService.reset();
  }
}
