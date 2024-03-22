import React from "react";
import {Outlet} from "react-router-dom";
import {AppLayout} from "src/layouts";
import SettingsIcon from "@mui/icons-material/Settings";
import {useDomainStore} from "src/contexts/store.context";
import {IconButton, Tooltip} from "@mui/material";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import WorkspaceSettingsPanel from "src/UI/pages/workspace/components/WorkspaceSettingsPanel";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {observer} from "mobx-react-lite";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";
import Loader from "src/UI/components/Loader";

import "./workspace.scss";
import CustomerSearchButton from "src/UI/components/Customer/CustomerSearchButton/CustomerSearchButton";
import {useCustomerService} from "src/contexts/services/customer.service.context";

const Workspace = () => {
  const customerService = useCustomerService();
  const {workspaceEnv, dictionaries} = useDomainStore();

  React.useEffect(() => {
    dictionaries.loadCinemaDictionary().then(() => {
      workspaceEnv.loadData(dictionaries.cinemaDictionary!.cinemas);
    });

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
        <div className="Workspace__toolbar">
          <div className="Workspace__toolbar-item">
            <CustomerSearchButton customerService={customerService} />
          </div>

          <div className="Workspace__toolbar-item">
            <Tooltip title="Настройка рабочего окружения">
              <IconButton onClick={() => toggleSettingsPanel()}>
                <SettingsIcon color={"inherit"} style={{color: "#fff"}} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      }
    >
      <WorkspaceSettingsPanel
        isOpen={isSettingsPanelOpen}
        toggleIsOpen={toggleSettingsPanel}
        envModel={workspaceEnv.envModel as WorkspaceEnvModel}
        cinemaDictionary={dictionaries.cinemaDictionary as CinemaDictionary}
      />
      {dictionaries.loaders.cinemaDictionary ? (
        <Loader />
      ) : (
        <Outlet
          context={
            {
              closeSettings: () => toggleSettingsPanel(false)
            } as WorkspaceContext
          }
        />
      )}
    </AppLayout>
  );
};

export default observer(Workspace);
