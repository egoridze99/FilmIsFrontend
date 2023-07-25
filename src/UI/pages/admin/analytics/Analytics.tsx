import React from "react";

import "./analytics.scss";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {AppLayout} from "src/layouts";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";

const Analytics = () => {
  useCurrentPageTitle();

  return (
    <AppLayout>
      <SubpagesToolbar />
      <div className="">It's analytics page</div>
    </AppLayout>
  );
};

export default Analytics;
