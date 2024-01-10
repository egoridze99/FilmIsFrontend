import {createContext, useContext} from "react";
import {
  admin,
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
  queue,
  admin
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
