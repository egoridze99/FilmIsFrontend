import React from "react";
import {IconButton} from "@mui/material";
import {copyToClipboard} from "src/utils/copyToClipboard";

const CopyToClipboardButton: React.FC<{
  icon: React.ReactNode;
  text: string;
  className?: string;
}> = ({icon, text, className}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    copyToClipboard(text);
  };

  return (
    <div style={{position: "relative"}}>
      <IconButton onClick={handleClick} className={className}>
        {icon}
      </IconButton>
    </div>
  );
};

export default CopyToClipboardButton;
