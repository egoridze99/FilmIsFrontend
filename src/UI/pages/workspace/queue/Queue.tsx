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
import {Drawer, Typography} from "@mui/material";
import QueueForm from "./components/QueueForm";
import {
  QueueCreationBodyType,
  QueueEditBodyType,
  QueueSearchBodyType
} from "src/types/queue/queue.dataClient.types";
import {QueueItem, QueueItemStatusEnum} from "src/types/shared.types";
import ReservationForm from "src/UI/pages/workspace/schedule/components/ReservationForm";
import {ReservationCreationBodyType} from "src/types/schedule/schedule.dataClient.types";
import {useSearchPanel} from "src/UI/pages/workspace/schedule/hooks/useSearchPanel";
import QueueSearchPanel from "src/UI/pages/workspace/queue/components/QueueSearchPanel";
import {searchPanelDefaultValues} from "src/UI/pages/workspace/queue/constants/searchPanelDefaultValues";
import {useCommonServices} from "src/contexts/commonServices.context";
import {QUEUE_IDS_TO_SEARCH} from "src/constants/storageKeys";
import {useCustomerService} from "src/contexts/services/customer.service.context";

const Queue = () => {
  useCurrentPageTitle();

  const customerService = useCustomerService();
  const {sessionStorageService} = useCommonServices();

  const [isEditPanelOpen, setIsEditPanelOpen] = React.useState(false);
  const [currentEditingItem, setCurrentEditingItem] =
    React.useState<QueueItem | null>(null);

  const [isCreationPanelOpen, setIsCreationPanelOpen] = React.useState(false);

  const [isCreateReservationPanelOpen, setIsCreateReservationPanelOpen] =
    React.useState(false);
  const [reservationScratch, setReservationScratch] =
    React.useState<QueueItem | null>(null);

  const [shouldShowReserved, setShouldShowReserved] = React.useState(false);

  const {queue, workspaceEnv, dictionaries, schedule} = useDomainStore();
  const env = workspaceEnv.envModel;
  const {closeSettings} = useOutletContext<WorkspaceContext>();

  const {
    searchValues,
    clearSearchValues,
    setSearchValues,
    isSearchPanelOpen,
    setIsSearchPanelOpen,
    activeSearchItems
  } = useSearchPanel(searchPanelDefaultValues);

  React.useEffect(() => {
    return () => {
      clearSearchValues();
      queue.reset();
      closeSettings();
    };
  }, []);

  React.useEffect(() => {
    if (sessionStorageService.getItem(QUEUE_IDS_TO_SEARCH)) {
      return;
    }

    clearSearchValues();
    queue.loadData(env);

    return () => {
      customerService.clearCustomersInApp();
    };
  }, [env?.cinema, env?.room, env?.date]);

  React.useEffect(() => {
    const ids = sessionStorageService.getItem(QUEUE_IDS_TO_SEARCH);
    if (!ids) {
      return;
    }

    setSearchValues({...searchValues, ids: ids.toString()});
    queue.searchQueueItems({...searchValues, ids: ids.toString()});
    sessionStorageService.removeItem(QUEUE_IDS_TO_SEARCH);
  }, []);

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

  const handleSearch = async (values: QueueSearchBodyType) => {
    const success = await queue.searchQueueItems(values);

    if (success) {
      if (values.status?.includes(QueueItemStatusEnum.reserved)) {
        setShouldShowReserved(true);
      }
      setSearchValues(values);
      setIsSearchPanelOpen(false);
    }
  };

  const queueItems = React.useMemo(() => {
    return shouldShowReserved
      ? queue.queue
      : queue.queue.filter((r) => r.status !== QueueItemStatusEnum.reserved);
  }, [queue.queue, shouldShowReserved]);

  return (
    <>
      <SubpagesToolbar
        customContent={
          <Toolbar
            openCreationPanel={() => setIsCreationPanelOpen(true)}
            shouldShowReserved={shouldShowReserved}
            toggleShouldShowReserved={() => setShouldShowReserved((p) => !p)}
            activeSearchItems={activeSearchItems}
            openSearchPanel={() => setIsSearchPanelOpen(true)}
          />
        }
      />
      <ContentContainer>
        {queue.isLoading ? (
          <Loader />
        ) : queueItems.length ? (
          queueItems.map((i) => (
            <QueueReservationCard
              item={i}
              classname="Queue__reservation-card"
              onEdit={(v) => openEditingPanel(v)}
              onCreateScratch={(v) => openCreateReservationPanel(v)}
            />
          ))
        ) : (
          <Typography align="center">
            Кажется на эту дату нет очередей...
          </Typography>
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
          customerService={customerService}
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
          customerService={customerService}
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
          customerService={customerService}
        />
      </Drawer>
      <Drawer
        open={isSearchPanelOpen}
        onClose={() => setIsSearchPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Queue__search-panel"}}
      >
        <QueueSearchPanel
          close={() => setIsSearchPanelOpen(false)}
          onReset={() => {
            customerService.clearCustomersInApp();
            queue.loadData(env);
            clearSearchValues();
          }}
          cinemaDictionary={dictionaries.cinemaDictionary}
          searchValues={searchValues}
          search={handleSearch}
        />
      </Drawer>
    </>
  );
};

export default observer(Queue);
