import {createContext, useContext} from "react";
import {schedule, workspaceEnv} from "src/app/app.composition";

const domainStore = {
  workspaceEnv,
  schedule
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
