import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";

import "./searchPanel.scss";

const SearchPanel = () => {
  return (
    <>
      <SidePanelHeader title={"Поиск сертификатов"} />
      <div className="SearchPanel"></div>
    </>
  );
};

export default SearchPanel;
