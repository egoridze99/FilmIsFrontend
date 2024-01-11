import React from "react";
import {CashierInfo} from "src/types/schedule/schedule.types";
import {usePageData} from "src/contexts/pageData.context";

import "./cashierInfoBar.scss";
import {cashierInfoTitleDictionary} from "src/UI/pages/workspace/schedule/components/CashierInfoBar/constatnts/cashierInfoDictionaries";
import {Grid} from "@mui/material";

type CashierInfoBarProps = {
  data: CashierInfo;
};

const CashierInfoBar: React.FC<CashierInfoBarProps> = ({data}) => {
  const {reduceSize} = usePageData();
  React.useEffect(() => {
    reduceSize({height: {CashierInfoBar: 50}});
    return () => reduceSize({height: {CashierInfoBar: 0}});
  }, []);

  const dataToRender = React.useMemo(() => {
    const fieldsToRender = Object.keys(cashierInfoTitleDictionary);

    return Object.keys(data)
      .filter((key) => fieldsToRender.includes(key))
      .sort(
        (a, b) =>
          cashierInfoTitleDictionary[a].weight -
          cashierInfoTitleDictionary[b].weight
      )
      .map((key) => ({
        title: cashierInfoTitleDictionary[key].title,
        value: data[key as keyof CashierInfo]
      }));
  }, [data]);

  return (
    <div className="CashierInfoBar">
      <Grid className="CashierInfoBar__grid" container>
        {dataToRender.map((item) => (
          <Grid item md={12 / dataToRender.length}>
            {item.title}: {item.value}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CashierInfoBar;
