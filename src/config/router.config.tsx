import {RouteType} from "src/types/router.types";
import Schedule from "src/UI/pages/workspace/schedule";
import Analytics from "src/UI/pages/admin/analytics";
import {ROUTER_PATHS} from "src/constants/routerPaths";
import Workspace from "src/UI/pages/workspace";
import SignIn from "src/UI/pages/sign-in";
import {GuardsEnum} from "src/types/guards.types";
import Queue from "src/UI/pages/workspace/queue";
import Certificates from "src/UI/pages/certificates";
import Users from "src/UI/pages/admin/users";

export const ROUTER_CONFIG = {
  ROUTES: [
    {
      path: ROUTER_PATHS.workspace,
      component: Workspace,
      title: "Рабочее место администратора",
      guards: [GuardsEnum.AUTHENTICATION_GUARD],
      navigateToNestedPath: ROUTER_PATHS.workspaceSchedule,
      subpages: [
        {
          path: ROUTER_PATHS.workspaceSchedule,
          component: Schedule,
          title: "Расписание сеансов"
        },
        {
          path: ROUTER_PATHS.workspaceQueue,
          component: Queue,
          title: "Очередь"
        }
      ]
    },
    {
      path: ROUTER_PATHS.certificate,
      component: Certificates,
      title: "Сертификаты",
      guards: [GuardsEnum.AUTHENTICATION_GUARD]
    },
    {
      path: ROUTER_PATHS.admin,
      title: "Панель суперпользователя",
      guards: [GuardsEnum.AUTHENTICATION_GUARD, GuardsEnum.ROOT_GUARD],
      navigateToNestedPath: ROUTER_PATHS.adminAnalytics,
      needAdmin: true,
      subpages: [
        {
          path: ROUTER_PATHS.adminAnalytics,
          component: Analytics,
          title: "Информация о выручке"
        },
        {
          path: ROUTER_PATHS.adminUsers,
          component: Users,
          title: "Пользователи"
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
