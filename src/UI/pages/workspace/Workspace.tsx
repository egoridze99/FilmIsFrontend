import React from "react";

import "./workspace.scss";
import {Outlet} from "react-router-dom";
import {useDomainStore} from "src/contexts/store.context";

const Workspace = (props) => {
  const {schedule} = useDomainStore();
  console.log(schedule.test);
  return (
    <>
      <div className="">It's workspace wrapper</div>

      <Outlet></Outlet>
    </>
  );
};

export default Workspace;
