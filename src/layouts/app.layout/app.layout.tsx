import React from "react";

import "./app.layout.scss";
import AppToolbar from "src/UI/components/AppToolbar";
import {ROUTER_CONFIG} from "src/config/router.config";
import {usePageData} from "src/contexts/pageData.context";

export type AppLayoutProps = {
  toolbarCustomContent?: React.ReactNode;
  children?: React.ReactNode;
};
export const AppLayout: React.FC<AppLayoutProps> = ({
  toolbarCustomContent,
  children
}) => {
  const {contentSize} = usePageData();

  return (
    <div className="AppLayout">
      <div className="AppLayout__toolbar">
        <AppToolbar
          routes={ROUTER_CONFIG.ROUTES}
          customContent={toolbarCustomContent}
        />
      </div>

      <div className="AppLayout__content" style={{height: contentSize.height}}>
        {children}
      </div>
    </div>
  );
};
