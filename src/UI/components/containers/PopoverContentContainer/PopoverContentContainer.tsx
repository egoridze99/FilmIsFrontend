import React from "react";

import "./popoverContentContainer.scss";

type PopoverContentContainerProps = {
  children: React.ReactNode | React.ReactNode[];
};

const PopoverContentContainer: React.FC<PopoverContentContainerProps> = ({
  children
}) => {
  return <div className="PopoverContentContainer">{children}</div>;
};

export default PopoverContentContainer;
