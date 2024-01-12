import React from "react";
import {AppBar, Toolbar} from "@mui/material";
import {useActiveRoute} from "src/hooks/useActiveRoute";
import Link from "src/UI/components/Link";

import "./subpagesToolbar.scss";
import classNames from "classnames";
import {usePageData} from "src/contexts/pageData.context";

type SubpagesToolbarProps = {
  customContent?: React.ReactNode;
};

const SubpagesToolbar: React.FC<SubpagesToolbarProps> = ({customContent}) => {
  const [page, activeSubpage] = useActiveRoute();

  const {reduceSize} = usePageData();
  React.useEffect(() => {
    reduceSize({height: {SubpagesToolbar: 50}});
    return () => reduceSize({height: {SubpagesToolbar: 0}});
  }, []);

  return (
    <AppBar position={"static"} className="SubpagesToolbar">
      <Toolbar variant="dense" className="SubpagesToolbar__toolbar">
        <div className="SubpagesToolbar__navigation">
          <ul className="SubpagesToolbar__list">
            {page?.subpages?.map((subpage) => (
              <li
                className={classNames("SubpagesToolbar__list-item", {
                  "SubpagesToolbar__list-item_active": subpage === activeSubpage
                })}
              >
                <Link to={subpage.path} className="SubpagesToolbar__link">
                  {subpage.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {customContent && (
          <div className="SubpagesToolbar__custom">{customContent}</div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SubpagesToolbar;
