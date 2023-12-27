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

const Queue = () => {
  useCurrentPageTitle();

  const {queue, workspaceEnv} = useDomainStore();
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

  return (
    <>
      <SubpagesToolbar />
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
    </>
  );
};

export default observer(Queue);
