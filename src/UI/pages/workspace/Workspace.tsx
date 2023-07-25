import React from "react";
import {Outlet} from "react-router-dom";
import {AppLayout} from "src/layouts";

import "./workspace.scss";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";

const Workspace = () => {
  return (
    <AppLayout>
      <SubpagesToolbar />
      <Outlet></Outlet>
    </AppLayout>
  );
};

export default Workspace;
