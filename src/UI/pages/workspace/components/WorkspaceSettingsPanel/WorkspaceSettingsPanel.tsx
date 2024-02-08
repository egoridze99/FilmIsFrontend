import React, {ChangeEvent} from "react";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {observer} from "mobx-react-lite";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import {Drawer, FormControl, MenuItem, TextField} from "@mui/material";
import {Cinema} from "src/types/shared.types";
import Datepicker from "src/UI/components/Datepicker";

import "./workspaceSettingsPanel.scss";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";

type WorkspaceSettingsPanelProps = {
  isOpen: boolean;
  toggleIsOpen: () => void;

  envModel: WorkspaceEnvModel;
  cinemaDictionary: CinemaDictionary;
};

const WorkspaceSettingsPanel: React.FC<WorkspaceSettingsPanelProps> = ({
  isOpen,
  toggleIsOpen,
  envModel,
  cinemaDictionary
}) => {
  const handleCinemaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cinemaId = event.target.value;
    const cinema = cinemaDictionary.cinemasAsDict[cinemaId];

    if (!cinema) {
      return;
    }

    envModel.setCinema(cinema as Cinema);
  };

  const handleRoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const roomId = event.target.value as unknown as number;
    const cinema = envModel.cinema;
    const room = cinema.rooms.find((r) => r.id === roomId);

    envModel.setRoom(room || null);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={() => toggleIsOpen()}
      anchor={"right"}
      classes={{paper: "WorkspaceSettingsPanel"}}
      className="WorkspaceSettingsPanel"
    >
      <SidePanelHeader title={"Настройка"} />

      <SidePanelContentContainer>
        <div className="WorkspaceSettingsPanel__section">
          <FormControl fullWidth>
            <TextField
              select
              variant="standard"
              value={envModel?.cinema?.id}
              label="Кинотеатр"
              onChange={handleCinemaChange}
            >
              {cinemaDictionary?.cinemas?.map((c) => (
                <MenuItem value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>

        <div className="WorkspaceSettingsPanel__section">
          <FormControl fullWidth>
            <TextField
              select
              variant="standard"
              value={envModel?.room?.id || -1}
              label="Кинозал"
              onChange={handleRoomChange}
            >
              {/* Костыль. У MenuItem value не может быть null*/}
              <MenuItem value={-1}>Все залы</MenuItem>
              {envModel?.cinema?.rooms?.map((r) => (
                <MenuItem value={r.id}>{r.name}</MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>

        <div className="WorkspaceSettingsPanel__section">
          <Datepicker
            className={"WorkspaceSettingsPanel__datepicker"}
            label={"Дата"}
            value={envModel?.date}
            onChange={(d) => {
              if (d) {
                envModel.setDate(d);
              }
            }}
          />
        </div>
      </SidePanelContentContainer>
    </Drawer>
  );
};

export default observer(WorkspaceSettingsPanel);
