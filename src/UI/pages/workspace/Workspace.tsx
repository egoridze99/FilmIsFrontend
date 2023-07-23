import React from "react";

import "./workspace.scss";
import {Outlet} from "react-router-dom";

const Workspace = () => {
  return (
    <>
      <div className="">It's workspace wrapper</div>

      <Outlet></Outlet>
    </>
  );
};

export default Workspace;
