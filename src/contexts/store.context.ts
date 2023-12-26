import {createContext, useContext} from "react";
import {
  certificates,
  dictionaries,
  schedule,
  workspaceEnv
} from "src/app/app.composition";

const domainStore = {
  workspaceEnv,
  dictionaries,
  schedule,
  certificates
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
