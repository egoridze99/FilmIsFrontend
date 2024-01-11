import React from "react";
import {useCommonServices} from "src/contexts/commonServices.context";
import {observer} from "mobx-react-lite";
import {Guard} from "src/types/guards.types";
import {Navigate} from "react-router-dom";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import {Roles} from "../types/core.types";

export const RootGuard: Guard = observer(({children}) => {
  const {authenticationService} = useCommonServices();

  return authenticationService.userData?.role === Roles.root ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTER_PATHS.workspace} replace />
  );
});
