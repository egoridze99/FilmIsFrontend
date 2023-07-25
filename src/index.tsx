import React from "react";
import ReactDOM from "react-dom/client";
import Router from "src/UI/Router";
import reportWebVitals from "./reportWebVitals";
import {CssBaseline} from "@mui/material";
import {configure} from "mobx";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  //https://github.com/mobxjs/mobx/issues/101
  observableRequiresReaction: false
});

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
