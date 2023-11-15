import React from "react";

import "./schedule.scss";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import {useDomainStore} from "src/contexts/store.context";
import {observer} from "mobx-react-lite";

const Schedule = () => {
  useCurrentPageTitle();

  const {schedule, workspaceEnv} = useDomainStore();
  const env = workspaceEnv.envModel;
  React.useEffect(() => {
    schedule.loadData(env);
  }, [env?.cinema, env?.room, env?.date]);

  const {closeSettings} = useOutletContext<WorkspaceContext>();
  React.useEffect(() => {
    return () => closeSettings();
  }, []);

  return (
    <>
      <SubpagesToolbar />
      <div>It's schedule page</div>
    </>
  );
};

export default observer(Schedule);
