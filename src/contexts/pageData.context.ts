import React, {useContext} from "react";

export const PageDataContext = React.createContext<{
  screenSize: {width: number; height: number};
  contentSize: {width: number; height: number};
  reduceSize: (data: {
    width?: Record<string, number>;
    height?: Record<string, number>;
  }) => void;
}>({
  contentSize: {width: 0, height: 0},
  screenSize: {width: 0, height: 0},
  reduceSize: () => {}
});
export const usePageData = () => useContext(PageDataContext);
