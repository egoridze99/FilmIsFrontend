import {RouteType} from "src/types/router.types";
import Schedule from "src/UI/pages/workspace/schedule";
import Analytics from "src/UI/pages/admin/analytics";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import Workspace from "src/UI/pages/workspace";
import SignIn from "src/UI/pages/sign-in";
import {GuardsEnum} from "src/types/guards.types";

export const ROUTER_CONFIG = {
  ROUTES: [
    {
      path: ROUTER_PATHS.workspace,
      component: Workspace,
      title: "Рабочее место администратора",
      isProtected: true,
      guards: [GuardsEnum.AUTHENTICATION_GUARD],
      navigateToNestedPath: ROUTER_PATHS.workspaceSchedule,
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
      title: "Панель суперпользователя",
      isProtected: true,
      guards: [GuardsEnum.AUTHENTICATION_GUARD],
      navigateToNestedPath: ROUTER_PATHS.adminAnalytics,
      subpages: [
        {
          path: ROUTER_PATHS.adminAnalytics,
          component: Analytics,
          title: "Информация о выручке"
        }
      ]
    },
    {
      path: ROUTER_PATHS.signIn,
      title: "Страница входа",
      component: SignIn,
      hidden: true
    }
  ] as RouteType[]
};
