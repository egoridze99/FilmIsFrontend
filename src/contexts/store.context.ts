import {createContext, useContext} from "react";
import {scheduleDataClient, workspaceEnv} from "src/app/app.composition";

const domainStore = {
  workspaceEnv: workspaceEnv,
  schedule: scheduleDataClient
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
