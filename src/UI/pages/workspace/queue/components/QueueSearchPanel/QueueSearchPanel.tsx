import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";

import "./queueSearchPanel.scss";

const QueueSearchPanel = () => {
  return (
    <>
      <SidePanelHeader title="Поиск в очереди" />
      <div className="QueueSearchPanel side-panel-form"></div>
    </>
  );
};

export default QueueSearchPanel;
