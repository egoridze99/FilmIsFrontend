import React from "react";
import {
  Badge,
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
  activeSearchItems: number;
};

const Toolbar: React.FC<ToolbarProps> = ({
  showCancelled,
  toggleShowCancelled,
  openCreationForm,
  openSearchPanel,
  activeSearchItems
}) => {
  const tunePopoverProps = usePopoverProps("schedule-tune-popover");

  const activeFilters = React.useMemo(() => {
    return [showCancelled].reduce((acc, i) => (i ? acc + 1 : acc), 0);
  }, [showCancelled]);

  return (
    <div className="ScheduleToolbar">
      <Tooltip
        title={"Управление элементами на странице"}
        className="ScheduleToolbar__item"
      >
        <Badge
          color="secondary"
          badgeContent={activeFilters ? activeFilters.toString() : undefined}
        >
          <IconButton
            aria-describedby={tunePopoverProps.id}
            onClick={tunePopoverProps.openPopover}
          >
            <Tune color={"inherit"} style={{color: "#fff"}} />
          </IconButton>
        </Badge>
      </Tooltip>

      <Tooltip title={"Поиск среди резервов"} className="ScheduleToolbar__item">
        <Badge
          badgeContent={
            activeSearchItems ? activeSearchItems.toString() : undefined
          }
          color="secondary"
        >
          <IconButton onClick={openSearchPanel}>
            <FilterAlt color={"inherit"} style={{color: "#fff"}} />
          </IconButton>
        </Badge>
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
