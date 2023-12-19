import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Icon,
  IconButton,
  Popover,
  Switch,
  Tooltip,
  Typography
} from "@mui/material";

import "./toolbar.scss";
import {Tune} from "@mui/icons-material";
import {usePopoverProps} from "src/hooks/usePopoverProps";
import PopoverContentContainer from "src/UI/components/containers/PopoverContentContainer";

type ToolbarProps = {
  showCancelled: boolean;
  toggleShowCancelled(): void;
};

const Toolbar: React.FC<ToolbarProps> = ({
  showCancelled,
  toggleShowCancelled
}) => {
  const tunePopoverProps = usePopoverProps("schedule-tune-popover");

  return (
    <div className="Toolbar">
      <Tooltip title={"Управление элементами на странице"}>
        <IconButton
          aria-label="qwerty"
          aria-describedby={tunePopoverProps.id}
          onClick={tunePopoverProps.openPopover}
        >
          <Tune color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>

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
