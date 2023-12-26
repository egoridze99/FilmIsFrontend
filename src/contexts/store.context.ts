import {createContext, useContext} from "react";
import {certificates, schedule, workspaceEnv} from "src/app/app.composition";

const domainStore = {
  workspaceEnv,
  schedule,
  certificates
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
