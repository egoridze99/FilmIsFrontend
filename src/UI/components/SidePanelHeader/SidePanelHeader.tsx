import React from "react";

import "./SidePanelHeader.scss";

type SidePanelHeaderProps = {
  title: string;
};

const SidePanelHeader: React.FC<SidePanelHeaderProps> = ({title}) => {
  return <p className="SidePanelHeader">{title}</p>;
};

export default SidePanelHeader;
