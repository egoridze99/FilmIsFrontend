import React from "react";

import "./sidePanelContentContainer.scss";
import classNames from "classnames";

type SidePanelContentContainerProps = {
  children: React.ReactNode | React.ReactNode[];

  className?: string;
};

const SidePanelContentContainer: React.FC<SidePanelContentContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={classNames("SidePanelContentContainer", className)}>
      {children}
    </div>
  );
};

export default SidePanelContentContainer;
