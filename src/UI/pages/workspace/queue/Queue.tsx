import React from "react";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";

import "./queue.scss";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import ContentContainer from "src/UI/components/containers/ContentContainer";
import {useDomainStore} from "src/contexts/store.context";
import Loader from "src/UI/components/Loader";
import QueueReservationCard from "src/UI/pages/workspace/queue/components/QueueReservationCard";
import {observer} from "mobx-react-lite";
import Toolbar from "./components/Toolbar";
import {Drawer} from "@mui/material";
import QueueForm from "./components/QueueForm";
import {QueueCreationBodyType} from "src/types/queue/queue.dataClient.types";

const Queue = () => {
  useCurrentPageTitle();

  const [isCreationPanelOpen, setIsCreationPanelOpen] = React.useState(false);

  const {queue, workspaceEnv, dictionaries} = useDomainStore();
  const env = workspaceEnv.envModel;
  const {closeSettings} = useOutletContext<WorkspaceContext>();

  React.useEffect(() => {
    return () => {
      queue.reset();
      closeSettings();
    };
  }, []);

  React.useEffect(() => {
    queue.loadData(env);
  }, [env?.cinema, env?.room, env?.date]);

  const handleCreateQueueItem = async (data: QueueCreationBodyType) => {
    const success = await queue.createQueueItem(data);

    if (success) {
      queue.loadData(env);
      setIsCreationPanelOpen(false);
    }
  };

  return (
    <>
      <SubpagesToolbar
        customContent={
          <Toolbar openCreationPanel={() => setIsCreationPanelOpen(true)} />
        }
      />
      <ContentContainer>
        {queue.isLoading ? (
          <Loader />
        ) : (
          queue.queue.map((i) => (
            <QueueReservationCard
              item={i}
              classname="Queue__reservation-card"
            />
          ))
        )}
      </ContentContainer>
      <Drawer
        open={isCreationPanelOpen}
        onClose={() => setIsCreationPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Queue__queue-form"}}
      >
        <QueueForm
          close={() => setIsCreationPanelOpen(false)}
          cinemaDictionary={dictionaries.cinemaDictionary}
          onCreate={handleCreateQueueItem}
        />
      </Drawer>
    </>
  );
};

export default observer(Queue);
