import {injectable} from "inversify";
import {axios} from "src/axios";
import {Cinema} from "src/types/workspace.types";

@injectable()
export class WorkspaceEnvDataClient {
  async loadEnvData() {
    const response = await axios.get<Cinema[]>("/reference/cinemas");

    return response.data;
  }
}
