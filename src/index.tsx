import React from "react";
import ReactDOM from "react-dom/client";
import Router from "src/UI/Router";
import reportWebVitals from "./reportWebVitals";
import {CssBaseline} from "@mui/material";

const RootElement = () => {
  return (
    <React.StrictMode>
      <CssBaseline>
        <Router />
      </CssBaseline>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootElement />
);

reportWebVitals();
