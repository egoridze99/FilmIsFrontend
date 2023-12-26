import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";

import "./creationForm.scss";

type CreationFormProps = {};

const CreationForm = () => {
  return (
    <>
      <SidePanelHeader title={"Создание сертификата"} />
      <div className="CreationForm"></div>
    </>
  );
};

export default CreationForm;
