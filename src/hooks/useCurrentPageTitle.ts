import {useActiveRoute} from "src/hooks/useActiveRoute";
import React from "react";

export const useCurrentPageTitle = () => {
  const title = "Film is";

  const [page, tab] = useActiveRoute();

  React.useEffect(() => {
    if (!page) {
      document.title = title;
      return;
    }

    document.title = tab
      ? `${title} - ${tab.title}`
      : `${title} - ${page.title}`;
  }, [page, tab]);
};
