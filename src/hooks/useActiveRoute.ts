import {useLocation} from "react-router-dom";
import {ROUTER_CONFIG} from "src/config/router.config";
import {RouteType, SubpageType} from "src/types/router.types";

export const useActiveRoute = (): [null | RouteType, null | SubpageType] => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameAsArray = pathname.split("/").filter((el) => el);

  const page = ROUTER_CONFIG.ROUTES.find(
    (route) => route.path === `/${pathnameAsArray[0]}`
  );

  if (!page) {
    return [null, null];
  }

  const subpage =
    page?.subpages?.find(
      (subpage) => subpage.path === `/${pathnameAsArray.join("/")}`
    ) || null;

  return [page, subpage];
};
