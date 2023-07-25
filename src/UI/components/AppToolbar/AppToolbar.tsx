import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {RouteType} from "src/types/router.types";
import {useActiveRoute} from "src/hooks/useActiveRoute";
import Link from "src/UI/components/Link";
import classNames from "classnames";

import "src/UI/components/AppToolbar/appToolbar.scss";

type AppToolbarProps = {
  routes: RouteType[];
  customContent?: React.ReactNode;
};

const AppToolbar: React.FC<AppToolbarProps> = ({routes, customContent}) => {
  const [page] = useActiveRoute();

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
        {customContent && (
          <div className="AppToolbar__custom">{customContent}</div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(AppToolbar);
