import React from "react";

import "./sidePanelContentContainer.scss";
import classNames from "classnames";

type SidePanelContentContainerProps = {
  children: React.ReactNode | React.ReactNode[];

  className?: string;
};

const SidePanelContentContainer: React.FC<SidePanelContentContainerProps> =
  React.forwardRef<HTMLDivElement, SidePanelContentContainerProps>(
    ({children, className}, ref) => {
      return (
        <div
          className={classNames("SidePanelContentContainer", className)}
          ref={ref}
        >
          {children}
        </div>
      );
    }
  );

export default SidePanelContentContainer;
