import React from "react";
import {Button, ButtonTypeMap, ExtendButtonBase} from "@mui/material";
import classnames from "classnames";

import "./toolbarButton.scss";

const ToolbarButton: ExtendButtonBase<ButtonTypeMap> = (props) => {
  return (
    <Button {...props} className={classnames(props.className, "ToolbarButton")}>
      {props.children}
    </Button>
  );
};

export default ToolbarButton;
