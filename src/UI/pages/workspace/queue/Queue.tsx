import React from "react";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";

import "./queue.scss";

const Queue = () => {
  const {closeSettings} = useOutletContext<WorkspaceContext>();

  React.useEffect(() => {
    return () => closeSettings();
  }, []);

  return (
    <>
      <SubpagesToolbar />
      <div className="Queue">It's queue page</div>
    </>
  );
};

export default Queue;
