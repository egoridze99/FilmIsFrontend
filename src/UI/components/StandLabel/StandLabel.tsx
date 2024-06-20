import React from "react";
import {isDev} from "src/utils/isDev";

import "./standLabel.scss";
import classnames from "classnames";

const StandLabel = () => {
  if (!isDev()) {
    return null;
  }

  return <div className={classnames("StandLabel")}>TEST</div>;
};

export default StandLabel;
