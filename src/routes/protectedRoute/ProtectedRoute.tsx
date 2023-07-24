import React from "react";
import {GuardsEnum} from "src/types/guards.types";
import {guardsDictionary} from "src/guards";
import {reverse} from "ramda";

type ProtectedRouteProps = {
  guards?: GuardsEnum[];
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({guards, children}) => {
  if (!guards) {
    return <>{children}</>;
  }

  return reverse(guards).reduce((acc, guard) => {
    const GuardComponent = guardsDictionary[guard];
    acc = <GuardComponent>{acc}</GuardComponent>;
    return acc;
  }, children);
};

export default ProtectedRoute;
