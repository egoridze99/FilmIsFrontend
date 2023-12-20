import React from "react";

import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import {useDomainStore} from "src/contexts/store.context";
import {observer} from "mobx-react-lite";
import ContentContainer from "src/UI/components/containers/ContentContainer";
import ScheduleReservationCard from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard";

import "./schedule.scss";
import CashierInfoBar from "src/UI/pages/workspace/schedule/components/CashierInfoBar";
import Toolbar from "src/UI/pages/workspace/schedule/components/Toolbar";
import {ReservationStatus} from "src/types/schedule/schedule.types";
import {Drawer} from "@mui/material";
import ReservationForm from "src/UI/pages/workspace/schedule/components/ReservationForm";
import {useReservationFormProps} from "src/UI/pages/workspace/schedule/hooks/useReservationFormProps";

const Schedule = () => {
  useCurrentPageTitle();

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
        {reservations.map((reservation) => (
          <ScheduleReservationCard
            reservation={reservation}
            classname="Schedule__reservation"
          />
        ))}
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
        />
      </Drawer>

      {schedule.cashierInfo && <CashierInfoBar data={schedule.cashierInfo} />}
    </>
  );
};

export default observer(Schedule);
