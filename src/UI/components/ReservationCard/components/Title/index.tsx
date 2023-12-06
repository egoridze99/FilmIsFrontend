import React from "react";
import {Typography} from "@mui/material";

export type TitleProps = {
  children: React.ReactNode;
};

export const Title: React.FC<TitleProps> = ({children}) => {
  return (
    <Typography variant="h5" component="h6" style={{fontWeight: 500}}>
      {children}
    </Typography>
  );
};
