import React from "react";
import ToolbarButton from "src/UI/components/ToolbarButton";

type ToolbarProps = {
  openCreationPanel(): void;
};

const Toolbar: React.FC<ToolbarProps> = ({openCreationPanel}) => {
  return (
    <div className="QueueToolbar">
      <ToolbarButton className="QueueToolbar__item" onClick={openCreationPanel}>
        Добавить элемент в очередь
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
