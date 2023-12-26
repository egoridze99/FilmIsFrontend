import React from "react";
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  Switch,
  Tooltip
} from "@mui/material";

import "./toolbar.scss";
import {FilterAlt, Tune} from "@mui/icons-material";
import {usePopoverProps} from "src/hooks/usePopoverProps";
import PopoverContentContainer from "src/UI/components/containers/PopoverContentContainer";
import ToolbarButton from "src/UI/components/ToolbarButton";

type ToolbarProps = {
  showCancelled: boolean;
  toggleShowCancelled(): void;
  openCreationForm(): void;
  openSearchPanel(): void;
};

const Toolbar: React.FC<ToolbarProps> = ({
  showCancelled,
  toggleShowCancelled,
  openCreationForm,
  openSearchPanel
}) => {
  const tunePopoverProps = usePopoverProps("schedule-tune-popover");

  return (
    <div className="ScheduleToolbar">
      <Tooltip
        title={"Управление элементами на странице"}
        className="ScheduleToolbar__item"
      >
        <IconButton
          aria-describedby={tunePopoverProps.id}
          onClick={tunePopoverProps.openPopover}
        >
          <Tune color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>

      <Tooltip title={"Поиск среди резервов"} className="ScheduleToolbar__item">
        <IconButton onClick={openSearchPanel}>
          <FilterAlt color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>

      <ToolbarButton
        onClick={openCreationForm}
        variant={"contained"}
        className="ScheduleToolbar__item"
      >
        Добавить резерв
      </ToolbarButton>

      <Popover
        id={tunePopoverProps.id}
        open={tunePopoverProps.isPopoverOpen}
        anchorEl={tunePopoverProps.anchorEl}
        onClose={tunePopoverProps.closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <PopoverContentContainer>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showCancelled}
                  onChange={toggleShowCancelled}
                />
              }
              label="Отображать отмененные"
              labelPlacement="end"
            />
          </FormGroup>
        </PopoverContentContainer>
      </Popover>
    </div>
  );
};

export default Toolbar;
