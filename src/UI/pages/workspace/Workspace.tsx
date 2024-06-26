import React from "react";
import {Outlet} from "react-router-dom";
import {AppLayout} from "src/layouts";
import SettingsIcon from "@mui/icons-material/Settings";
import {useDomainStore} from "src/contexts/store.context";
import {IconButton, Modal, Tooltip, Typography} from "@mui/material";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import WorkspaceSettingsPanel from "src/UI/pages/workspace/components/WorkspaceSettingsPanel";
import {WorkspaceEnvModel} from "src/models/workspaceEnv/workspaceEnv.model";
import {observer} from "mobx-react-lite";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";
import Loader from "src/UI/components/Loader";
import CustomerSearchButton from "src/UI/components/Customer/CustomerSearchButton/CustomerSearchButton";
import {useCustomerService} from "src/contexts/services/customer.service.context";
import {AttachMoney} from "@mui/icons-material";
import {useTransactions} from "src/hooks/useTransactions";
import {useTransactionService} from "src/contexts/services/transaction.service.context";
import {Moment} from "moment";
import TransactionsWindow from "src/UI/components/TransactionsWindow";
import CashierInfoBar from "src/UI/pages/workspace/schedule/components/CashierInfoBar";

import "./workspace.scss";
import StandLabel from "src/UI/components/StandLabel";

const Workspace = () => {
  const transactionService = useTransactionService();
  const customerService = useCustomerService();
  const {workspaceEnv, dictionaries} = useDomainStore();

  React.useEffect(() => {
    if (!workspaceEnv.envModel) {
      return;
    }

    transactionService.loadCashierInfo(
      workspaceEnv.envModel.cinema.id,
      workspaceEnv.envModel.date
    );
  }, [workspaceEnv.envModel?.cinema, workspaceEnv.envModel?.date]);

  React.useEffect(() => {
    dictionaries.loadCinemaDictionary().then(() => {
      workspaceEnv.loadData(dictionaries.cinemaDictionary!.cinemas);
    });

    return () => {
      workspaceEnv.reset();
      transactionService.clearCashierInfo();
    };
  }, []);

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = React.useState(false);
  const toggleSettingsPanel = (val?: boolean) => {
    if (val === undefined) {
      setIsSettingsPanelOpen((prev) => !prev);
    } else {
      setIsSettingsPanelOpen(val);
    }
  };

  const {
    loadTransactions,
    isTransactionsModalOpen,
    isTransactionsLoading,
    closeTransactionsModal,
    transactions
  } = useTransactions(() =>
    transactionService.loadCinemaTransactions(
      workspaceEnv.envModel?.cinema.id as number,
      workspaceEnv.envModel?.date as Moment
    )
  );

  return (
    <AppLayout
      toolbarCustomContent={
        <div className="Workspace__toolbar">
          <div className="Workspace__toolbar-item">
            <Tooltip title="Транзакции связанные с кинотеатром">
              <IconButton onClick={() => loadTransactions()}>
                <AttachMoney color={"inherit"} style={{color: "#fff"}} />
              </IconButton>
            </Tooltip>
          </div>

          <div className="Workspace__toolbar-item">
            <CustomerSearchButton customerService={customerService} />
          </div>

          <div className="Workspace__toolbar-item">
            <Tooltip title="Настройка рабочего окружения">
              <IconButton onClick={() => toggleSettingsPanel()}>
                <SettingsIcon color={"inherit"} style={{color: "#fff"}} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      }
    >
      <WorkspaceSettingsPanel
        isOpen={isSettingsPanelOpen}
        toggleIsOpen={toggleSettingsPanel}
        envModel={workspaceEnv.envModel as WorkspaceEnvModel}
        cinemaDictionary={dictionaries.cinemaDictionary as CinemaDictionary}
      />
      {dictionaries.loaders.cinemaDictionary ? (
        <Loader />
      ) : (
        <Outlet
          context={
            {
              closeSettings: () => toggleSettingsPanel(false)
            } as WorkspaceContext
          }
        />
      )}

      <TransactionsWindow
        isOpen={isTransactionsModalOpen}
        onClose={closeTransactionsModal}
        addButtonTooltip={
          "Транзакция будет добавлена в ТЕКУЩИЙ день. Вне зависимости от того, какая дата выбрана"
        }
        title={
          <Typography variant="h6">
            Информация о транзакциях в кинотеатре по адресу:{" "}
            {workspaceEnv.envModel?.cinema.name}
          </Typography>
        }
        transactions={transactions}
        onNewTransactionAdd={async (data) => {
          const result = await transactionService.createTransaction(data, {
            cinema_id: workspaceEnv.envModel?.cinema.id as number
          });

          if (result) {
            await transactionService.loadCashierInfo(
              workspaceEnv.envModel!.cinema.id,
              workspaceEnv.envModel!.date
            );
            loadTransactions();

            return true;
          }

          return false;
        }}
        makeRefund={async (transaction) => {
          const result = await transactionService.makeRefund(transaction);

          if (result) {
            await transactionService.loadCashierInfo(
              workspaceEnv.envModel!.cinema.id,
              workspaceEnv.envModel!.date
            );
          }
        }}
        isLoading={isTransactionsLoading}
        loadTransactionHistory={(id) =>
          transactionService.loadTransactionChangesLog(id) as any
        }
      />

      {transactionService.cashierInfo && (
        <CashierInfoBar data={transactionService.cashierInfo} />
      )}
    </AppLayout>
  );
};

export default observer(Workspace);
