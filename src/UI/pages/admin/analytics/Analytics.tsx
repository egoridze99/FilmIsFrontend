import React from "react";

import "./analytics.scss";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {AppLayout} from "src/layouts";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useDomainStore} from "src/contexts/store.context";
import AdminToolbar from "src/UI/pages/admin/components/AdminToolbar";
import Loader from "src/UI/components/Loader";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  Typography
} from "@mui/material";
import SettingsPanel from "src/UI/pages/admin/analytics/components/SettingsPanel";
import AnalyticsToolbar from "src/UI/pages/admin/analytics/components/Toolbar";
import {usePageData} from "src/contexts/pageData.context";
import {observer} from "mobx-react-lite";
import {useCustomerService} from "src/contexts/services/customer.service.context";
import {ArrowDropDownIcon} from "@mui/x-date-pickers";
import {getNumberMask} from "src/utils/getNumberMask";

const cinemaSlicesDict = {
  cinema: "Кинотеатр",
  reservations: "Резервы",
  total: "Всего"
};

const incomeKeysDict = {
  card: "По карте",
  cash: "Наличкой",
  sbp: "СБП",
  total: "Всего"
};

const Analytics = () => {
  useCurrentPageTitle();
  const {contentSize} = usePageData();

  const customerService = useCustomerService();

  const {admin} = useDomainStore();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  React.useEffect(() => () => admin.clearAnalyticData(), []);

  const onSettingsApply = async (data: {dateFrom: string; dateTo: string}) => {
    const success = await admin.getAnalyticData(data.dateFrom, data.dateTo);
    if (success) {
      setIsSettingsOpen(false);
    }
  };

  return (
    <AppLayout
      toolbarCustomContent={
        <AdminToolbar
          getTelephones={(data) => admin.getTelephones(data)}
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
            <div className="Analytics" style={{maxHeight: contentSize.height}}>
              <div className="Analytics__container">
                {admin.analyticData.map((cinema) => (
                  <Accordion key={cinema.cinema_id} disableGutters>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                      <Typography variant="h6">{cinema.cinema_name}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      {cinema.total_duration && (
                        <Typography>
                          <Typography component="span" fontWeight={500}>
                            Общая продолжительность бронирований:
                          </Typography>{" "}
                          {getNumberMask(cinema.total_duration)}
                        </Typography>
                      )}

                      {cinema.income && (
                        <>
                          <Typography fontWeight={500}>Доход:</Typography>
                          <div className="Analytics__cashier-data">
                            {Object.entries(cinemaSlicesDict).map(
                              ([key, title]) => {
                                if (cinema!.income![key]) {
                                  return (
                                    <>
                                      <Typography fontWeight={500}>
                                        {title}:
                                      </Typography>
                                      <div className="Analytics__cashier-data-section">
                                        {Object.keys(incomeKeysDict).map(
                                          (paymentMethod) => (
                                            <Typography>
                                              {incomeKeysDict[paymentMethod]}:{" "}
                                              {getNumberMask(
                                                cinema!.income![key][
                                                  paymentMethod
                                                ]
                                              )}
                                            </Typography>
                                          )
                                        )}
                                      </div>
                                    </>
                                  );
                                }

                                return null;
                              }
                            )}
                          </div>
                        </>
                      )}

                      {cinema.expense && (
                        <>
                          <Typography fontWeight={500}>Расход:</Typography>
                          <div className="Analytics__cashier-data">
                            {Object.entries(cinemaSlicesDict).map(
                              ([key, title]) => {
                                if (cinema!.expense![key]) {
                                  return (
                                    <Typography>
                                      {title}:{" "}
                                      {getNumberMask(cinema!.expense![key])}
                                    </Typography>
                                  );
                                }

                                return null;
                              }
                            )}
                          </div>
                        </>
                      )}

                      {cinema.refunds && (
                        <>
                          <Typography fontWeight={500}>Возвраты:</Typography>
                          <div className="Analytics__cashier-data">
                            {Object.entries(cinemaSlicesDict).map(
                              ([key, title]) => {
                                if (cinema!.refunds![key]) {
                                  return (
                                    <Typography>
                                      {title}:{" "}
                                      {getNumberMask(cinema!.refunds![key])}
                                    </Typography>
                                  );
                                }

                                return null;
                              }
                            )}
                          </div>
                        </>
                      )}

                      {cinema.rooms && cinema.rooms.length && (
                        <div className="Analytics__rooms">
                          <Typography fontWeight={500}>
                            Инфа по залам
                          </Typography>
                          {cinema.rooms.map((room) => (
                            <Accordion key={room.room_id} disableGutters>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                              >
                                <Typography fontWeight={500}>
                                  {room.room_name}
                                </Typography>
                              </AccordionSummary>

                              <AccordionDetails>
                                {room.total_duration && (
                                  <Typography>
                                    <Typography
                                      component="span"
                                      fontWeight={500}
                                    >
                                      Общая продолжительность бронирований:
                                    </Typography>{" "}
                                    {getNumberMask(room.total_duration)}
                                  </Typography>
                                )}

                                {room.income && (
                                  <>
                                    <Typography fontWeight={500}>
                                      Доход:
                                    </Typography>
                                    <div className="Analytics__cashier-data">
                                      {Object.keys(incomeKeysDict).map(
                                        (paymentMethod) => (
                                          <Typography>
                                            {incomeKeysDict[paymentMethod]}:{" "}
                                            {getNumberMask(
                                              room!.income![paymentMethod]
                                            )}
                                          </Typography>
                                        )
                                      )}
                                    </div>
                                  </>
                                )}

                                {room.expense && (
                                  <Typography>
                                    <Typography
                                      component="span"
                                      fontWeight={500}
                                    >
                                      Расходы:
                                    </Typography>{" "}
                                    {getNumberMask(room.expense)}
                                  </Typography>
                                )}

                                {room.refunds && (
                                  <Typography>
                                    <Typography
                                      component="span"
                                      fontWeight={500}
                                    >
                                      Возвраты:
                                    </Typography>{" "}
                                    {getNumberMask(room.refunds)}
                                  </Typography>
                                )}
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </div>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
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
