import React, {useEffect, useState} from "react";
import {PageDataContext} from "src/contexts/pageData.context";
import useResizeObserver from "use-resize-observer";
import {sum} from "ramda";

type ScreenSizeType = {
  width: number;
  height: number;
};

const PageDataProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({children}) => {
  const screenSize = useResizeObserver<HTMLDivElement>({
    ref: window.document.getElementById("root") as HTMLDivElement
  }) as ScreenSizeType;

  const [contentSize, setContentSize] = useState<ScreenSizeType>(screenSize);

  const [sizeValues, setSizeValues] = useState<{
    width: Record<string, number>;
    height: Record<string, number>;
  }>({
    width: {},
    height: {}
  });

  const updateSize = (data: {
    width?: Record<string, number>;
    height?: Record<string, number>;
  }) => {
    setSizeValues((prev) => {
      const clone = {...prev};
      if (data.height) {
        clone.height = {...clone.height, ...data.height};
      }
      if (data.width) {
        clone.width = {...clone.width, ...data.width};
      }

      return clone;
    });
  };

  useEffect(() => {
    const widthSum = sum(Object.values(sizeValues.width));
    const heightSum = sum(Object.values(sizeValues.height));
    setContentSize({
      width: screenSize.width - widthSum,
      height: screenSize.height - heightSum
    });
  }, [sizeValues, screenSize, screenSize.width, screenSize.height]);

  return (
    <PageDataContext.Provider
      value={{
        screenSize,
        contentSize,
        reduceSize: updateSize
      }}
    >
      {children}
    </PageDataContext.Provider>
  );
};

export default PageDataProvider;
