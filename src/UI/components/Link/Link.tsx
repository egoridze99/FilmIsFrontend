import React from "react";
import {useCommonServices} from "src/contexts/commonServices.context";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

const Link: React.FC<RouterLinkProps> = (props) => {
  const {navigationService} = useCommonServices();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    navigationService.navigate(props.to as string);
  };

  return <RouterLink {...props} onClick={handleClick} />;
};

export default Link;
