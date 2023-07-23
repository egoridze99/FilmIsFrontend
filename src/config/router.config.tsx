import {RouteType} from "src/types/router.types";
import Schedule from "src/UI/pages/workspace/schedule";
import Analytics from "src/UI/pages/admin/analytics";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import Workspace from "src/UI/pages/workspace";
import SignIn from "src/UI/pages/sign-in";

export const ROUTER_CONFIG = {
  ROUTES: [
    {
      path: ROUTER_PATHS.workspace,
      component: Workspace,
      title: "Рабочее место",
      isProtected: true,
      subpages: [
        {
          path: ROUTER_PATHS.workspaceSchedule,
          component: Schedule,
          title: "Расписание сеансов",
          index: true
        }
      ]
    },
    {
      path: ROUTER_PATHS.admin,
      title: "Панель администратора",
      isProtected: true,
      subpages: [
        {
          path: ROUTER_PATHS.adminAnalytics,
          component: Analytics,
          title: "Расписание сеансов"
        }
      ]
    },
    {
      path: ROUTER_PATHS.signIn,
      title: "Страница входа",
      component: SignIn
    }
  ] as RouteType[]
};
