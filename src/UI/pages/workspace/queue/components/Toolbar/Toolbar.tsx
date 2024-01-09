import React from "react";
import ToolbarButton from "src/UI/components/ToolbarButton";
import {
  Badge,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  Switch,
  Tooltip
} from "@mui/material";
import {FilterAlt, Tune} from "@mui/icons-material";
import {usePopoverProps} from "src/hooks/usePopoverProps";
import PopoverContentContainer from "src/UI/components/containers/PopoverContentContainer";

import "./toolbar.scss";

type ToolbarProps = {
  openCreationPanel(): void;
  shouldShowReserved: boolean;
  toggleShouldShowReserved: () => void;
  openSearchPanel(): void;
  activeSearchItems: number;
};

const Toolbar: React.FC<ToolbarProps> = ({
  openCreationPanel,
  shouldShowReserved,
  toggleShouldShowReserved,
  openSearchPanel,
  activeSearchItems
}) => {
  const tunePopoverProps = usePopoverProps("queue-tune-popover");

  const activeFilters = React.useMemo(() => {
    return [shouldShowReserved].reduce((acc, i) => (i ? acc + 1 : acc), 0);
  }, [shouldShowReserved]);

  return (
    <div className="QueueToolbar">
      <Tooltip
        title={"Управление элементами на странице"}
        className="QueueToolbar__item"
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

      <Tooltip title={"Поиск среди резервов"} className="QueueToolbar__item">
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

      <ToolbarButton className="QueueToolbar__item" onClick={openCreationPanel}>
        Добавить элемент в очередь
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
                  checked={shouldShowReserved}
                  onChange={toggleShouldShowReserved}
                />
              }
              label="Отображать перешедшие в резерв"
              labelPlacement="end"
            />
          </FormGroup>
        </PopoverContentContainer>
      </Popover>
    </div>
  );
};

export default Toolbar;
