import React, {JSX} from "react";

import "./contentContainer.scss";

type ContentContainerProps = {
  children: React.ReactNode | React.ReactNode[];
};

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  return <div className="ContentContainer">{children}</div>;
};

export default ContentContainer;
