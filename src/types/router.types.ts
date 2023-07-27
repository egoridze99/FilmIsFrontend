import {FC} from "react";
import {GuardsEnum} from "src/types/guards.types";

export type RouteType = {
  path: string;
  component?: FC;
  subpages?: SubpageType[];
  title: string;
  hidden?: boolean;
  isProtected?: boolean;
  guards?: GuardsEnum[];
  navigateToNestedPath?: string;
};

export type SubpageType = {
  path: string;
  component: FC;
  title: string;
};
