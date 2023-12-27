import {createContext, useContext} from "react";
import {
  certificates,
  dictionaries,
  queue,
  schedule,
  workspaceEnv
} from "src/app/app.composition";

const domainStore = {
  workspaceEnv,
  dictionaries,
  schedule,
  certificates,
  queue
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
