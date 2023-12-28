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
import {
  QueueCreationBodyType,
  QueueEditBodyType
} from "src/types/queue/queue.dataClient.types";
import {QueueItem} from "src/types/shared.types";
import ReservationForm from "src/UI/pages/workspace/schedule/components/ReservationForm";
import {ReservationCreationBodyType} from "src/types/schedule/schedule.dataClient.types";

const Queue = () => {
  useCurrentPageTitle();

  const [isEditPanelOpen, setIsEditPanelOpen] = React.useState(false);
  const [currentEditingItem, setCurrentEditingItem] =
    React.useState<QueueItem | null>(null);

  const [isCreationPanelOpen, setIsCreationPanelOpen] = React.useState(false);

  const [isCreateReservationPanelOpen, setIsCreateReservationPanelOpen] =
    React.useState(false);
  const [reservationScratch, setReservationScratch] =
    React.useState<QueueItem | null>(null);

  const {queue, workspaceEnv, dictionaries, schedule} = useDomainStore();
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

  const openEditingPanel = (item: QueueItem) => {
    setIsEditPanelOpen(true);
    setCurrentEditingItem(item);
  };

  const closeEditingPanel = () => {
    setIsEditPanelOpen(false);
    setCurrentEditingItem(null);
  };

  const openCreateReservationPanel = (item: QueueItem) => {
    setReservationScratch(item);
    setIsCreateReservationPanelOpen(true);
  };

  const closeCreateReservationPanel = () => {
    setReservationScratch(null);
    setIsCreateReservationPanelOpen(false);
  };

  const handleCreateReservation = async (data: ReservationCreationBodyType) => {
    const success = await schedule.createReservation(data);

    if (success) {
      await queue.closeQueueItem(reservationScratch?.id as number);
      queue.loadData(env);
      closeCreateReservationPanel();
    }
  };

  const handleCreateQueueItem = async (data: QueueCreationBodyType) => {
    const success = await queue.createQueueItem(data);

    if (success) {
      queue.loadData(env);
      setIsCreationPanelOpen(false);
    }
  };

  const handleEditQueueItem = async (data: QueueEditBodyType) => {
    const success = await queue.editQueueItem(
      data,
      currentEditingItem?.id as number
    );

    if (success) {
      queue.loadData(env);
      closeEditingPanel();
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
              onEdit={(v) => openEditingPanel(v)}
              onCreateScratch={(v) => openCreateReservationPanel(v)}
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
      <Drawer
        open={isEditPanelOpen}
        onClose={closeEditingPanel}
        anchor={"right"}
        classes={{paper: "Queue__queue-form"}}
      >
        <QueueForm
          close={closeEditingPanel}
          cinemaDictionary={dictionaries.cinemaDictionary}
          onCreate={handleEditQueueItem}
          isEditMode
          queueItem={currentEditingItem}
        />
      </Drawer>
      <Drawer
        open={isCreateReservationPanelOpen}
        onClose={closeCreateReservationPanel}
        anchor={"right"}
        classes={{paper: "Queue__queue-form"}}
      >
        <ReservationForm
          close={closeCreateReservationPanel}
          cinemas={dictionaries.cinemaDictionary?.cinemas || []}
          save={handleCreateReservation}
          reservation={reservationScratch}
          isCreationFromScratch
        />
      </Drawer>
    </>
  );
};

export default observer(Queue);
