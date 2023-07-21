import {createContext, useContext} from "react";
import {scheduleDataClient} from "src/app/app.composition";

const domainStore = {
  schedule: scheduleDataClient
};

const domainStoreContext = createContext(domainStore);

export const useDomainStore = (): typeof domainStore =>
  useContext(domainStoreContext);
