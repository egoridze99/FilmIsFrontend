import React from "react";

import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import {useDomainStore} from "src/contexts/store.context";
import {observer} from "mobx-react-lite";
import ReservationCard from "src/UI/components/ReservationCard";
import ContentContainer from "src/UI/components/ContentContainer";
import {reservationCardCells} from "src/UI/pages/workspace/schedule/constants/reservationCardCells";

import "./schedule.scss";

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
      <div className="Schedule">
        <ContentContainer>
          {schedule.reservations.map((reservation) => (
            <ReservationCard
              title={reservation.room.name}
              reservation={reservation}
              cells={reservationCardCells}
              className="Schedule__reservation"
            />
          ))}
        </ContentContainer>
      </div>
    </>
  );
};

export default observer(Schedule);
