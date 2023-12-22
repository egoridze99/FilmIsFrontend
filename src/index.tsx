import React from "react";
import ReactDOM from "react-dom/client";
import Router from "src/UI/Router";
import reportWebVitals from "./reportWebVitals";
import {CssBaseline} from "@mui/material";
import {configure} from "mobx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

import "moment/locale/ru";
import PageDataContextProvider from "src/contexts/providers/pageData.context.provider";
import Notifications from "src/UI/components/Notifications";
import {useCommonServices} from "src/contexts/commonServices.context";
import {observer} from "mobx-react-lite";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  //https://github.com/mobxjs/mobx/issues/101
  observableRequiresReaction: false
});

const RootElement = observer(() => {
  const {notificationService} = useCommonServices();

  return (
    <CssBaseline>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
        <PageDataContextProvider>
          <Router />
          <Notifications
            notifications={notificationService.notifications}
            clearNotifications={() => notificationService.clearNotifications()}
            removeNotification={(n) =>
              notificationService.removeNotification(n)
            }
          />
        </PageDataContextProvider>
      </LocalizationProvider>
    </CssBaseline>
  );
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootElement />
);

reportWebVitals();
