import React, {FC} from "react";

export type RouteType = {
  path: string;
  component?: FC;
  subpages?: SubpageType[];
  title: string;
  hidden?: boolean;
  isProtected?: boolean;
};

export type SubpageType = {
  path: string;
  component: FC;
  title: string;
  index?: boolean;
};
