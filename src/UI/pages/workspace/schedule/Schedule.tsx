import React from "react";

import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import {useOutletContext} from "react-router-dom";
import {WorkspaceContext} from "src/UI/pages/workspace/Workspace.types";
import {useDomainStore} from "src/contexts/store.context";
import {observer} from "mobx-react-lite";
import ContentContainer from "src/UI/components/containers/ContentContainer";
import ScheduleReservationCard from "src/UI/pages/workspace/schedule/components/ScheduleReservationCard";
import Toolbar from "src/UI/pages/workspace/schedule/components/Toolbar";
import {
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import {Drawer, Modal, Typography} from "@mui/material";
import ReservationForm from "src/UI/pages/workspace/schedule/components/ReservationForm";
import {useReservationFormProps} from "src/UI/pages/workspace/schedule/hooks/useReservationFormProps";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType,
  ReservationSearchBodyType
} from "src/types/schedule/schedule.dataClient.types";
import SearchPanel from "./components/SearchPanel";
import {useSearchPanel} from "src/UI/pages/workspace/schedule/hooks/useSearchPanel";
import {useChangesHistory} from "src/hooks/useChangesHistory";
import ChangesHistoryModal from "../components/ChangesHistoryModal";
import Loader from "src/UI/components/Loader";
import {searchPanelDefaultValues} from "src/UI/pages/workspace/schedule/constants/searchPanelDefaultValues";
import {useCustomerService} from "src/contexts/services/customer.service.context";

import "./schedule.scss";
import {useTransactions} from "src/hooks/useTransactions";
import TransactionsWindow from "src/UI/components/TransactionsWindow";
import {useTransactionService} from "src/contexts/services/transaction.service.context";
import moment from "moment";

const Schedule = () => {
  useCurrentPageTitle();

  const [editingReservation, setEditingReservation] =
    React.useState<Reservation | null>(null);
  const [showCancelled, setShowCancelled] = React.useState(false);

  const {
    searchValues,
    clearSearchValues,
    setSearchValues,
    isSearchPanelOpen,
    setIsSearchPanelOpen,
    activeSearchItems
  } = useSearchPanel(searchPanelDefaultValues);
  const customerService = useCustomerService();
  const transactionService = useTransactionService();
  const {schedule, workspaceEnv, dictionaries} = useDomainStore();
  const env = workspaceEnv.envModel;

  React.useEffect(() => {
    schedule.createReactions();

    return () => schedule.reset();
  }, []);
  React.useEffect(() => {
    clearSearchValues();
    schedule.loadData(env);
  }, [env?.cinema, env?.room, env?.date]);

  const {closeSettings} = useOutletContext<WorkspaceContext>();
  React.useEffect(() => {
    return () => closeSettings();
  }, []);

  const {
    isReservationFormOpened: isCreationFormOpened,
    openReservationForm: openCreationForm,
    closeReservationForm: closeCreationForm
  } = useReservationFormProps(closeSettings);

  const {
    isReservationFormOpened: isEditFormOpened,
    openReservationForm: openEditForm,
    closeReservationForm: closeEditForm
  } = useReservationFormProps(closeSettings);

  const handleOpenEditForm = (reservation: Reservation) => {
    setEditingReservation(reservation);
    openEditForm();
  };

  const handleCloseEditForm = () => {
    closeEditForm();
    setEditingReservation(null);
  };

  const handleCreateReservation = async (data: ReservationCreationBodyType) => {
    const success = await schedule.createReservation(data);

    if (success) {
      schedule.loadData(env);
      closeCreationForm();
    }
  };

  const handleEditReservation = async (data: ReservationEditBodyType) => {
    const success = await schedule.editReservation(
      data,
      editingReservation?.id as number
    );

    if (success) {
      await schedule.loadData(env);
      await transactionService.loadCashierInfo(env!.cinema.id, env!.date);

      closeEditForm();
    }
  };

  const handleSearch = async (values: ReservationSearchBodyType) => {
    const success = await schedule.searchReservations(values);

    if (success) {
      if (values.statuses.includes(ReservationStatus.canceled)) {
        setShowCancelled(true);
      }
      setSearchValues(values);
      setIsSearchPanelOpen(false);
    }
  };

  const {
    isChangesModalOpen,
    changesHistory,
    loadChangesHistory,
    closeChangesModal,
    isChangesLoading
  } = useChangesHistory((id) => schedule.loadChangesHistory(id));

  const {
    itemInTransactionWindow,
    isTransactionsModalOpen,
    isTransactionsLoading,
    transactions,
    addTransactionToList,
    loadTransactions,
    closeTransactionsModal
  } = useTransactions((id) => schedule.loadReservationTransactions(id));

  const reservations = React.useMemo(() => {
    return showCancelled
      ? schedule.reservations
      : schedule.reservations.filter(
          (reservation) => reservation.status !== ReservationStatus.canceled
        );
  }, [schedule.reservations, showCancelled]);

  const isTransactionsEditingBlocked = React.useMemo(() => {
    let result = false;

    if (itemInTransactionWindow?.status === ReservationStatus.finished) {
      result = true;
    }

    if (itemInTransactionWindow?.status === ReservationStatus.canceled) {
      result = true;
    }

    let reservationDate = moment((itemInTransactionWindow as Reservation)?.date)
      .utc()
      .startOf("day");
    const currentDate = moment().utc().startOf("day").add({day: -1});

    if (reservationDate?.isBefore(currentDate)) {
      result = true;
    }

    return result;
  }, [itemInTransactionWindow]);

  return (
    <>
      <SubpagesToolbar
        customContent={
          <Toolbar
            showCancelled={showCancelled}
            toggleShowCancelled={() => setShowCancelled((prev) => !prev)}
            openCreationForm={openCreationForm}
            openSearchPanel={() => setIsSearchPanelOpen(true)}
            activeSearchItems={activeSearchItems}
          />
        }
      />
      <ContentContainer>
        {schedule.isLoading ? (
          <Loader />
        ) : reservations.length ? (
          reservations.map((reservation) => (
            <ScheduleReservationCard
              key={reservation.id}
              reservation={reservation}
              classname="Schedule__reservation"
              onEdit={(reservation) => handleOpenEditForm(reservation)}
              onSeeChangesHistory={async (id) => loadChangesHistory(id)}
              onLoadTransactions={async (id) => loadTransactions(id)}
            />
          ))
        ) : (
          <Typography align="center">
            Кажется на эту дату нет бронирований...
          </Typography>
        )}
      </ContentContainer>

      <Drawer
        open={isSearchPanelOpen}
        onClose={() => setIsSearchPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Schedule__search-panel"}}
      >
        <SearchPanel
          cinemaDictionary={dictionaries.cinemaDictionary}
          close={() => setIsSearchPanelOpen(false)}
          search={handleSearch}
          searchValues={searchValues}
          onReset={() => {
            schedule.loadData(env);
            clearSearchValues();
          }}
        />
      </Drawer>

      <Drawer
        open={isCreationFormOpened}
        onClose={closeCreationForm}
        anchor={"right"}
        classes={{paper: "Schedule__reservation-form"}}
      >
        <ReservationForm
          cinemas={dictionaries.cinemaDictionary?.cinemas || []}
          close={closeCreationForm}
          save={handleCreateReservation}
          loadCertificate={(ident) => schedule.loadCertificate(ident)}
          customerService={customerService}
        />
      </Drawer>

      <Drawer
        open={isEditFormOpened}
        onClose={handleCloseEditForm}
        anchor={"right"}
        classes={{paper: "Schedule__reservation-form"}}
      >
        <ReservationForm
          isEditMode
          cinemas={dictionaries.cinemaDictionary?.cinemas || []}
          close={handleCloseEditForm}
          save={handleEditReservation}
          reservation={editingReservation}
          loadCertificate={(ident) => schedule.loadCertificate(ident)}
          customerService={customerService}
        />
      </Drawer>

      <Modal open={isChangesModalOpen} onClose={closeChangesModal}>
        <ChangesHistoryModal
          changesHistory={changesHistory}
          isLoading={isChangesLoading}
        />
      </Modal>

      <Modal open={isTransactionsModalOpen} onClose={closeTransactionsModal}>
        <TransactionsWindow
          title={
            <Typography variant="h6">
              Информация о транзакциях резерва №{itemInTransactionWindow?.id}
            </Typography>
          }
          customContent={
            <div className={"Schedule__reservation-transaction-window-info"}>
              <p
                className={"Schedule__reservation-transaction-window-info-text"}
              >
                <span className="Schedule__reservation-transaction-window-info-text_bolded">
                  Общая сумма аренды:
                </span>{" "}
                {(itemInTransactionWindow as Reservation)?.rent}
              </p>
              {(itemInTransactionWindow as Reservation)?.certificate && (
                <p
                  className={
                    "Schedule__reservation-transaction-window-info-text"
                  }
                >
                  <span className="Schedule__reservation-transaction-window-info-text_bolded">
                    Применен сертификат на сумму:
                  </span>{" "}
                  {(itemInTransactionWindow as Reservation)?.certificate?.sum}
                </p>
              )}
            </div>
          }
          transactions={transactions}
          onNewTransactionAdd={async (data) => {
            const result = await schedule.createReservationTransaction(
              data,
              itemInTransactionWindow?.id as number
            );

            if (result) {
              await transactionService.loadCashierInfo(
                env!.cinema.id,
                env!.date
              );
              addTransactionToList(result);
              return true;
            }

            return false;
          }}
          isLoading={isTransactionsLoading}
          isAddingDisabled={isTransactionsEditingBlocked}
          isRefundDisabled={isTransactionsEditingBlocked}
          isRelatedReservationColumnHidden={true}
          isRelatedCertificateColumnHidden={true}
          makeRefund={async (transaction) => {
            const result = await transactionService.makeRefund(transaction);

            if (result) {
              await transactionService.loadCashierInfo(
                env!.cinema.id,
                env!.date
              );
            }
          }}
        />
      </Modal>
    </>
  );
};

export default observer(Schedule);
