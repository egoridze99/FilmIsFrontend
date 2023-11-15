import React from "react";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {observer} from "mobx-react-lite";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import {
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import {Cinema} from "src/types/workspace.types";
import moment from "moment";
import Datepicker from "src/UI/components/Datepicker";

import "./workspaceSettingsPanel.scss";

type WorkspaceSettingsPanelProps = {
  isOpen: boolean;
  toggleIsOpen: () => void;

  envModel: WorkspaceEnvModel;
};

const WorkspaceSettingsPanel: React.FC<WorkspaceSettingsPanelProps> = ({
  isOpen,
  toggleIsOpen,
  envModel
}) => {
  const handleCinemaChange = (event: SelectChangeEvent<number>) => {
    const cinemaId = event.target.value;
    const cinema = envModel.cinemas.find((c) => c.id === cinemaId);
    envModel.setCinema(cinema as Cinema);
  };

  const handleRoomChange = (event: SelectChangeEvent<number>) => {
    const roomId = event.target.value;
    const room = envModel.cinema.rooms.find((r) => r.id === roomId);
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

      <div className="WorkspaceSettingsPanel__content">
        <div className="WorkspaceSettingsPanel__content-section">
          <FormControl fullWidth>
            <InputLabel id="WorkspaceSettingsPanel__cinema-selector">
              Кинотеатр
            </InputLabel>
            <Select
              labelId="WorkspaceSettingsPanel__cinema-selector"
              value={envModel?.cinema?.id}
              label="Кинотеатр"
              onChange={handleCinemaChange}
            >
              {envModel?.cinemas?.map((c) => (
                <MenuItem value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="WorkspaceSettingsPanel__content-section">
          <FormControl fullWidth>
            <InputLabel id="WorkspaceSettingsPanel__room-selector">
              Кинозал
            </InputLabel>
            <Select
              labelId="WorkspaceSettingsPanel__room-selector"
              value={envModel?.room?.id || -1}
              label="Кинозал"
              onChange={handleRoomChange}
            >
              {/* Костыль. У MenuItem value не может быть null*/}
              <MenuItem value={-1}>Все залы</MenuItem>
              {envModel?.cinema?.rooms?.map((r) => (
                <MenuItem value={r.id}>{r.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="WorkspaceSettingsPanel__content-section">
          <Datepicker
            className={"WorkspaceSettingsPanel__datepicker"}
            label={"Дата"}
            value={moment(envModel?.date)}
            onChange={(d) => {
              if (d) {
                envModel.setDate(d.toDate());
              }
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default observer(WorkspaceSettingsPanel);
