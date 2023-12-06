import React from "react";
import ReactDOM from "react-dom/client";
import Router from "src/UI/Router";
import reportWebVitals from "./reportWebVitals";
import {CssBaseline} from "@mui/material";
import {configure} from "mobx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

import "moment/locale/ru";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  //https://github.com/mobxjs/mobx/issues/101
  observableRequiresReaction: false
});

const RootElement = () => {
  return (
    <CssBaseline>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
        <Router />
      </LocalizationProvider>
    </CssBaseline>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootElement />
);

reportWebVitals();
