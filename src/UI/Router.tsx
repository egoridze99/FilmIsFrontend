import React, {useLayoutEffect, useState} from "react";

import "./stylesheets/core.scss";
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTER_CONFIG} from "src/config/router.config";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import NotFound from "src/UI/pages/not-found";
import {Router as BaseRouter} from "react-router-dom";
import {useCommonServices} from "src/contexts/commonServices.context";

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
        <Route
          path={ROUTER_PATHS.workspace}
          element={<Navigate to={ROUTER_PATHS.workspaceSchedule} />}
        />
        <Route
          path={ROUTER_PATHS.admin}
          element={<Navigate to={ROUTER_PATHS.adminAnalytics} />}
        />
        <Route
          path={ROUTER_PATHS.root}
          element={<Navigate to={ROUTER_PATHS.workspace} />}
        />
        {ROUTER_CONFIG.ROUTES.map((route) => {
          const subpages = route.subpages;
          if (!subpages || subpages.length === 0) {
            return (
              <Route
                key={route.path}
                element={route.component ? <route.component /> : undefined}
                path={route.path}
              />
            );
          }

          const subroutes = subpages.map((subpage) => (
            <Route
              key={subpage.path}
              path={subpage.path}
              element={<subpage.component />}
              index={subpage.index}
            />
          ));

          return (
            <Route
              key={route.path}
              element={route.component ? <route.component /> : undefined}
              path={route.path}
            >
              {subroutes}
            </Route>
          );
        })}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </BaseRouter>
  );
}

export default Router;
