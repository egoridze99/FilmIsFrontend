import React, {useLayoutEffect, useState} from "react";

import "./stylesheets/core.scss";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {ROUTER_CONFIG} from "src/config/router.config";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import NotFound from "src/UI/pages/not-found";
import {Router as BaseRouter} from "react-router-dom";
import {useCommonServices} from "src/contexts/commonServices.context";
import ProtectedRoute from "src/routes/protectedRoute";
import PublicRoute from "src/routes/publicRoute";

function Router() {
  const {navigationService} = useCommonServices();

  const [state, setState] = useState({
    action: navigationService.history.action,
    location: navigationService.history.location
  });
  useLayoutEffect(
    () => navigationService.history.listen(setState),
    [navigationService.history]
  );

  return (
    <BaseRouter
      location={state.location}
      navigationType={state.action}
      navigator={navigationService.history}
    >
      <Routes>
        {ROUTER_CONFIG.ROUTES.map((route) => {
          const isProtected = route.guards && route.guards.length > 0;
          const subpages = route.subpages;

          const RouteWrapper = isProtected ? ProtectedRoute : PublicRoute;

          if (!subpages || subpages.length === 0) {
            return (
              <Route
                key={route.path}
                element={
                  <RouteWrapper guards={route.guards}>
                    {route.component ? <route.component /> : <Outlet />}
                  </RouteWrapper>
                }
                path={route.path}
              />
            );
          }

          const subroutes = subpages.map((subpage) => (
            <Route
              key={subpage.path}
              path={subpage.path}
              element={<subpage.component />}
            />
          ));

          return (
            <Route
              key={route.path}
              element={
                <RouteWrapper guards={route.guards}>
                  {route.component ? <route.component /> : <Outlet />}
                </RouteWrapper>
              }
              path={route.path}
            >
              {route.navigateToNestedPath && (
                <Route
                  index
                  element={<Navigate to={route.navigateToNestedPath} replace />}
                />
              )}
              {subroutes}
            </Route>
          );
        })}
        <Route
          path={ROUTER_PATHS.root}
          element={<Navigate to={ROUTER_PATHS.workspace} />}
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BaseRouter>
  );
}

export default Router;
