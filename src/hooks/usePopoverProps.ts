import React from "react";

export const usePopoverProps = (id: string) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    openPopover,
    closePopover,
    isPopoverOpen: Boolean(anchorEl),
    id: Boolean(anchorEl) ? id : undefined
  };
};
