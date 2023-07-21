import {createContext, useContext} from "react";
import {commonServices} from "src/app/app.composition";

const commonServicesContext = createContext(commonServices);

export const useCommonServices = (): typeof commonServices =>
  useContext(commonServicesContext);
