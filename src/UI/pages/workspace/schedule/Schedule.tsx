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
import {Drawer, Typography} from "@mui/material";
import ReservationForm from "src/UI/pages/workspace/schedule/components/ReservationForm";
import {useReservationFormProps} from "src/UI/pages/workspace/schedule/hooks/useReservationFormProps";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType
} from "src/types/schedule/schedule.dataClient.types";

import "./schedule.scss";

const Schedule = () => {
  useCurrentPageTitle();

  const [editingReservation, setEditingReservation] =
    React.useState<Reservation | null>(null);
  const [showCancelled, toggleShowCancelled] = React.useReducer(
    (prev) => !prev,
    false
  );

  const {schedule, workspaceEnv} = useDomainStore();
  const env = workspaceEnv.envModel;

  React.useEffect(() => () => schedule.reset(), []);
  React.useEffect(() => {
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

  const reservations = React.useMemo(() => {
    return showCancelled
      ? schedule.reservations
      : schedule.reservations.filter(
          (reservation) => reservation.status !== ReservationStatus.canceled
        );
  }, [schedule.reservations]);

  return (
    <>
      <SubpagesToolbar
        customContent={
          <Toolbar
            showCancelled={showCancelled}
            toggleShowCancelled={toggleShowCancelled}
            openCreationForm={openCreationForm}
          />
        }
      />
      <ContentContainer>
        {reservations.length ? (
          reservations.map((reservation) => (
            <ScheduleReservationCard
              reservation={reservation}
              classname="Schedule__reservation"
              onEdit={(reservation) => handleOpenEditForm(reservation)}
            />
          ))
        ) : (
          <Typography align="center">
            Кажется на эту дату нет бронирований...
          </Typography>
        )}
      </ContentContainer>

      <Drawer
        open={isCreationFormOpened}
        onClose={closeCreationForm}
        anchor={"right"}
        classes={{paper: "Schedule__reservation-form"}}
      >
        <ReservationForm
          cinemas={env?.cinemas || []}
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
          cinemas={env?.cinemas || []}
          close={handleCloseEditForm}
          save={handleEditReservation}
          reservation={editingReservation}
          loadCertificate={(ident) => schedule.loadCertificate(ident)}
        />
      </Drawer>

      {schedule.cashierInfo && <CashierInfoBar data={schedule.cashierInfo} />}
    </>
  );
};

export default observer(Schedule);
