import React from "react";

import "./schedule.scss";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";

const Schedule = () => {
  useCurrentPageTitle();

  return <div>It's schedule page</div>;
};

export default Schedule;
