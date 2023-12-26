import React from "react";

import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import {useDomainStore} from "src/contexts/store.context";
import {observer} from "mobx-react-lite";
import ContentContainer from "src/UI/components/containers/ContentContainer";
import ScheduleReservationCard from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard";
import CashierInfoBar from "src/UI/pages/workspace/schedule/components/CashierInfoBar";
import Toolbar from "src/UI/pages/workspace/schedule/components/Toolbar";
import {
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import {Drawer, Modal, Typography} from "@mui/material";
import ReservationForm from "src/UI/pages/workspace/schedule/components/ReservationForm";
import {useReservationFormProps} from "src/UI/pages/workspace/schedule/hooks/useReservationFormProps";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import SearchPanel from "./components/SearchPanel";
import {useSearchPanel} from "src/UI/pages/workspace/schedule/hooks/useSearchPanel";

import "./schedule.scss";
import {useChangesHistory} from "src/UI/pages/workspace/schedule/hooks/useChangesHistory";
import ChangesHistoryModal from "./components/ChangesHistoryModal";
import Loader from "src/UI/components/Loader";

const Schedule = () => {
  useCurrentPageTitle();

  const [editingReservation, setEditingReservation] =
    React.useState<Reservation | null>(null);
  const [showCancelled, setShowCancelled] = React.useState(false);

  const {
    searchValues,
    clearSearchValues,
    setSearchValues,
    isSearchPanelOpen,
    setIsSearchPanelOpen,
    activeSearchItems
  } = useSearchPanel();
  const {schedule, workspaceEnv, dictionaries} = useDomainStore();
  const env = workspaceEnv.envModel;

  React.useEffect(() => () => schedule.reset(), []);
  React.useEffect(() => {
    clearSearchValues();
    schedule.loadData(env);
  }, [env?.cinema, env?.room, env?.date]);
  React.useEffect(() => {
    schedule.loadCashierInfo(env);
  }, [env?.cinema, env?.date]);

  const {closeSettings} = useOutletContext<WorkspaceContext>();
  React.useEffect(() => {
    return () => closeSettings();
  }, []);

  const {
    isReservationFormOpened: isCreationFormOpened,
    openReservationForm: openCreationForm,
    closeReservationForm: closeCreationForm
  } = useReservationFormProps(closeSettings);

  const {
    isReservationFormOpened: isEditFormOpened,
    openReservationForm: openEditForm,
    closeReservationForm: closeEditForm
  } = useReservationFormProps(closeSettings);

  const handleOpenEditForm = (reservation: Reservation) => {
    setEditingReservation(reservation);
    openEditForm();
  };

  const handleCloseEditForm = () => {
    closeEditForm();
    setEditingReservation(null);
  };

  const handleCreateReservation = async (data: ReservationCreationBodyType) => {
    const success = await schedule.createReservation(data);

    if (success) {
      schedule.loadData(env);
      closeCreationForm();
    }
  };

  const handleEditReservation = async (data: ReservationEditBodyType) => {
    const success = await schedule.editReservation(
      data,
      editingReservation?.id as number
    );

    if (success) {
      schedule.loadData(env);
      schedule.loadCashierInfo(env);

      closeEditForm();
    }
  };

  const handleSearch = async (values: ReservationSearchBodyType) => {
    const success = await schedule.searchReservations(values);

    if (success) {
      if (values.statuses.includes(ReservationStatus.canceled)) {
        setShowCancelled(true);
      }
      setSearchValues(values);
      setIsSearchPanelOpen(false);
    }
  };

  const {
    isChangesModalOpen,
    changesHistory,
    loadChangesHistory,
    closeChangesModal,
    isChangesLoading
  } = useChangesHistory((id) => schedule.loadChangesHistory(id));

  const reservations = React.useMemo(() => {
    return showCancelled
      ? schedule.reservations
      : schedule.reservations.filter(
          (reservation) => reservation.status !== ReservationStatus.canceled
        );
  }, [schedule.reservations, showCancelled]);

  return (
    <>
      <SubpagesToolbar
        customContent={
          <Toolbar
            showCancelled={showCancelled}
            toggleShowCancelled={() => setShowCancelled((prev) => !prev)}
            openCreationForm={openCreationForm}
            openSearchPanel={() => setIsSearchPanelOpen(true)}
            activeSearchItems={activeSearchItems}
          />
        }
      />
      <ContentContainer>
        {() => {
          if (schedule.isLoading) {
            return <Loader />;
          }
          return reservations.length ? (
            reservations.map((reservation) => (
              <ScheduleReservationCard
                reservation={reservation}
                classname="Schedule__reservation"
                onEdit={(reservation) => handleOpenEditForm(reservation)}
                onSeeChangesHistory={async (id) => loadChangesHistory(id)}
              />
            ))
          ) : (
            <Typography align="center">
              Кажется на эту дату нет бронирований...
            </Typography>
          );
        }}
      </ContentContainer>

      <Drawer
        open={isSearchPanelOpen}
        onClose={() => setIsSearchPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Schedule__search-panel"}}
      >
        <SearchPanel
          cinemaDictionary={dictionaries.cinemaDictionary}
          close={() => setIsSearchPanelOpen(false)}
          search={handleSearch}
          searchValues={searchValues}
          onReset={() => {
            schedule.loadData(env);
            clearSearchValues();
          }}
        />
      </Drawer>

      <Drawer
        open={isCreationFormOpened}
        onClose={closeCreationForm}
        anchor={"right"}
        classes={{paper: "Schedule__reservation-form"}}
      >
        <ReservationForm
          cinemas={dictionaries.cinemaDictionary?.cinemas || []}
          close={closeCreationForm}
          save={handleCreateReservation}
          loadCertificate={(ident) => schedule.loadCertificate(ident)}
        />
      </Drawer>

      <Drawer
        open={isEditFormOpened}
        onClose={handleCloseEditForm}
        anchor={"right"}
        classes={{paper: "Schedule__reservation-form"}}
      >
        <ReservationForm
          isEditMode
          cinemas={dictionaries.cinemaDictionary?.cinemas || []}
          close={handleCloseEditForm}
          save={handleEditReservation}
          reservation={editingReservation}
          loadCertificate={(ident) => schedule.loadCertificate(ident)}
        />
      </Drawer>

      <Modal open={isChangesModalOpen} onClose={closeChangesModal}>
        <ChangesHistoryModal
          changesHistory={changesHistory}
          isLoading={isChangesLoading}
        />
      </Modal>

      {schedule.cashierInfo && <CashierInfoBar data={schedule.cashierInfo} />}
    </>
  );
};

export default observer(Schedule);
