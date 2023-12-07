import React, {JSX} from "react";

import "./contentContainer.scss";
import {usePageData} from "src/contexts/pageData.context";

type ContentContainerProps = {
  children: React.ReactNode | React.ReactNode[];
};

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  const {contentSize} = usePageData();

  return (
    <div className="ContentContainer" style={{height: contentSize.height}}>
      <div className="ContentContainer__content">{children}</div>
    </div>
  );
};

export default ContentContainer;
