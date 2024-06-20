import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {RouteType} from "src/types/router.types";
import {useActiveRoute} from "src/hooks/useActiveRoute";
import Link from "src/UI/components/Link";
import classNames from "classnames";

import "src/UI/components/AppToolbar/appToolbar.scss";
import UserIcon from "src/UI/components/UserIcon";
import {usePageData} from "src/contexts/pageData.context";
import {useCommonServices} from "../../../contexts/commonServices.context";
import {Roles} from "../../../types/core.types";
import StandLabel from "src/UI/components/StandLabel";

type AppToolbarProps = {
  routes: RouteType[];
  customContent?: React.ReactNode;
};

const AppToolbar: React.FC<AppToolbarProps> = ({routes, customContent}) => {
  const [page] = useActiveRoute();

  const {authenticationService} = useCommonServices();

  const {reduceSize} = usePageData();
  React.useEffect(() => {
    reduceSize({height: {AppToolbar: 50}});
    return () => reduceSize({height: {AppToolbar: 0}});
  }, []);

  const standLabel = <StandLabel />;

  return (
    <AppBar className="AppToolbar" position="relative" elevation={4}>
      <Toolbar className="AppToolbar__toolbar" variant="dense">
        <div className="AppToolbar__navigation">
          <Typography variant="h6" component="h1">
            FILM IS
          </Typography>
          <nav className="AppToolbar__nav">
            <ul className="AppToolbar__nav-list">
              {routes
                .filter((route) => !route.hidden)
                .filter((route) => {
                  if (authenticationService.userData?.role === Roles.root) {
                    return route;
                  }

                  return !route.needAdmin;
                })
                .map((route) => {
                  return (
                    <li
                      className={classNames("AppToolbar__nav-list-item", {
                        "AppToolbar__nav-list-item_active": page === route
                      })}
                      key={route.path}
                    >
                      <Link className="AppToolbar__nav-link" to={route.path}>
                        {route.title}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
        <div className="AppToolbar__controls">
          {customContent && (
            <div className="AppToolbar__custom">{customContent}</div>
          )}
          <UserIcon />
          {standLabel && (
            <div className="AppToolbar__stand-label">{standLabel}</div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(AppToolbar);
