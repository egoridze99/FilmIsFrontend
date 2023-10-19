import React from "react";
import {Outlet} from "react-router-dom";
import {AppLayout} from "src/layouts";

import "./workspace.scss";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useDomainStore} from "src/contexts/store.context";

const Workspace = () => {
  const {workspaceEnv} = useDomainStore();

  React.useEffect(() => {
    workspaceEnv.loadData();

    return () => {
      workspaceEnv.reset();
    };
  }, []);

  return (
    <AppLayout>
      <SubpagesToolbar />
      <Outlet></Outlet>
    </AppLayout>
  );
};

export default Workspace;
