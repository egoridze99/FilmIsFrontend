import React from "react";

import "./analytics.scss";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {AppLayout} from "src/layouts";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useDomainStore} from "src/contexts/store.context";
import AdminToolbar from "src/UI/pages/admin/components/AdminToolbar";
import Loader from "src/UI/components/Loader";
import {Card, Drawer, Typography} from "@mui/material";
import SettingsPanel from "src/UI/pages/admin/analytics/components/SettingsPanel";
import AnalyticsToolbar from "src/UI/pages/admin/analytics/components/Toolbar";
import {usePageData} from "src/contexts/pageData.context";
import {getNumberMask} from "src/utils/getNumberMask";
import {observer} from "mobx-react-lite";
import {useCustomerService} from "src/contexts/services/customer.service.context";

const Analytics = () => {
  useCurrentPageTitle();
  const {contentSize} = usePageData();

  const customerService = useCustomerService();

  const {admin} = useDomainStore();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  React.useEffect(() => () => admin.clearAnalyticData(), []);

  const totals = React.useMemo(() => {
    return {
      money: admin.analyticData?.money.reduce((acc, i) => acc + i.sum, 0) || 0,
      duration:
        admin.analyticData?.duration.reduce((acc, i) => acc + i.sum, 0) || 0,
      checkout:
        admin.analyticData?.checkout.reduce((acc, i) => acc + i.sum, 0) || 0
    };
  }, [admin.analyticData]);

  const onSettingsApply = async (data: {
    dateFrom: string;
    dateTo: string;
    area: string;
  }) => {
    const success = await admin.getAnalyticData(
      data.dateFrom,
      data.dateTo,
      data.area as any
    );
    if (success) {
      setIsSettingsOpen(false);
    }
  };

  return (
    <AppLayout
      toolbarCustomContent={
        <AdminToolbar
          getTelephones={() => admin.getTelephones()}
          customerService={customerService}
        />
      }
    >
      <SubpagesToolbar
        customContent={
          <AnalyticsToolbar openSettings={() => setIsSettingsOpen(true)} />
        }
      />
      {admin.isLoading ? (
        <Loader />
      ) : (
        admin.analyticData && (
          <>
            <div className="Analytics" style={{height: contentSize.height}}>
              <Card className="Analytics__item">
                <Typography variant="h5" className="Analytics__item-title">
                  Всего заработано: {getNumberMask(totals.money)}
                </Typography>
                {admin.analyticData.money.map((item) => (
                  <div>
                    <h2>{item.area}:</h2>
                    <p>Картой: {getNumberMask(item.card || 0)}</p>
                    <p>Наличкой: {getNumberMask(item.cash || 0)}</p>
                    <p>Всего: {getNumberMask(item.sum || 0)}</p>
                  </div>
                ))}
              </Card>

              <Card className="Analytics__item">
                <Typography variant="h5" className="Analytics__item-title">
                  Всего потрачено: {getNumberMask(Math.abs(totals.checkout))}
                </Typography>
                {admin.analyticData.checkout.map((item) => (
                  <div>
                    <h2>{item.area}:</h2>
                    <span>{getNumberMask(Math.abs(item.sum))}</span>
                  </div>
                ))}
              </Card>

              <Card className="Analytics__item">
                <Typography variant="h5" className="Analytics__item-title">
                  Всего часов просмотров: {getNumberMask(totals.duration)}
                </Typography>
                {admin.analyticData.duration.map((item) => (
                  <div>
                    <h2>{item.area}:</h2>
                    <span>{getNumberMask(item.sum)}</span>
                  </div>
                ))}
              </Card>
            </div>
          </>
        )
      )}

      <Drawer
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        anchor={"right"}
        classes={{paper: "Analytics__settings-panel"}}
        keepMounted
      >
        <SettingsPanel
          close={() => setIsSettingsOpen(false)}
          onSubmit={onSettingsApply}
        />
      </Drawer>
    </AppLayout>
  );
};

export default observer(Analytics);
