import React from "react";
import {observer} from "mobx-react-lite";
import {useCommonServices} from "src/contexts/commonServices.context";
import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {indigo} from "@mui/material/colors";

import "./userIcon.scss";

const UserIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  const {authenticationService} = useCommonServices();
  const userInitials = authenticationService?.userData?.name
    ?.split(" ")
    .map((s) => s[0])
    .join("");

  return (
    <div className="UserIcon">
      <Tooltip title="Настройки профиля">
        <IconButton
          size="small"
          ref={buttonRef}
          onClick={() => setIsMenuOpen(true)}
        >
          <Avatar variant="circular" sx={{bgcolor: indigo[800]}}>
            {userInitials}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={buttonRef.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={() => authenticationService.logout()}>
          Выйти
        </MenuItem>
      </Menu>
    </div>
  );
};

export default observer(UserIcon);
