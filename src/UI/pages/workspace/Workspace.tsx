import React from "react";
import {Outlet} from "react-router-dom";
import {AppLayout} from "src/layouts";
import SettingsIcon from "@mui/icons-material/Settings";
import {useDomainStore} from "src/contexts/store.context";
import {IconButton} from "@mui/material";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";

import "./workspace.scss";
import WorkspaceSettingsPanel from "src/UI/pages/workspace/components/WorkspaceSettingsPanel";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {observer} from "mobx-react-lite";

const Workspace = () => {
  const {workspaceEnv} = useDomainStore();

  React.useEffect(() => {
    workspaceEnv.loadData();

    return () => {
      workspaceEnv.reset();
    };
  }, []);

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = React.useState(false);
  const toggleSettingsPanel = (val?: boolean) => {
    if (val === undefined) {
      setIsSettingsPanelOpen((prev) => !prev);
    } else {
      setIsSettingsPanelOpen(val);
    }
  };

  return (
    <AppLayout
      toolbarCustomContent={
        <div>
          <IconButton onClick={() => toggleSettingsPanel()}>
            <SettingsIcon />
          </IconButton>
        </div>
      }
    >
      <WorkspaceSettingsPanel
        isOpen={isSettingsPanelOpen}
        toggleIsOpen={toggleSettingsPanel}
        envModel={workspaceEnv.envModel as WorkspaceEnvModel}
      />
      <Outlet
        context={
          {closeSettings: () => toggleSettingsPanel(false)} as WorkspaceContext
        }
      />
    </AppLayout>
  );
};

export default observer(Workspace);
