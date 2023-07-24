import React from "react";
import {useCommonServices} from "src/contexts/commonServices.context";
import {observer} from "mobx-react-lite";
import {Guard} from "src/types/guards.types";
import {Navigate} from "react-router-dom";
import {ROUTER_PATHS} from "src/constants/routerPaths";

export const AuthenticationGuard: Guard = observer(({children}) => {
  const {authenticationService} = useCommonServices();

  return authenticationService.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTER_PATHS.signIn} replace />
  );
});
