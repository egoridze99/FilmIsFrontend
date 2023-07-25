import React from "react";

import "./app.layout.scss";
import AppToolbar from "src/UI/components/AppToolbar";
import {ROUTER_CONFIG} from "src/config/router.config";

export type AppLayoutProps = {
  toolbarCustomContent?: React.ReactNode;
  children?: React.ReactNode;
};
export const AppLayout: React.FC<AppLayoutProps> = ({
  toolbarCustomContent,
  children
}) => {
  return (
    <div className="AppLayout">
      <div className="AppLayout__toolbar">
        <AppToolbar routes={ROUTER_CONFIG.ROUTES} />
      </div>

      <div className="AppLayout__content">{children}</div>
    </div>
  );
};
