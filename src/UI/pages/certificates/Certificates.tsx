import React from "react";
import {AppLayout} from "src/layouts";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {usePageData} from "src/contexts/pageData.context";
import {useDomainStore} from "src/contexts/store.context";
import {DataGrid} from "@mui/x-data-grid";
import {getColumns} from "src/UI/pages/certificates/columns/getColumns";
import {observer} from "mobx-react-lite";
import {Card, Drawer, Typography} from "@mui/material";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import Toolbar from "./components/Toolbar";
import CreationForm from "src/UI/pages/certificates/components/CreationForm";
import SearchPanel from "./components/SearchPanel";
import {
  CertificateCreationBodyType,
  CertificateSearchBodyType
} from "src/types/certificates/certificates.dataClient.types";
import {useSearch} from "src/UI/pages/certificates/hooks/useSearch";
import Loader from "src/UI/components/Loader";

import "./certificates.scss";
import CustomerSearchButton from "src/UI/components/Customer/CustomerSearchButton/CustomerSearchButton";
import {useCustomerService} from "src/contexts/services/customer.service.context";
import {useTransactions} from "src/hooks/useTransactions";
import {useTransactionService} from "src/contexts/services/transaction.service.context";
import TransactionsWindow from "src/UI/components/TransactionsWindow";
import {Certificate} from "src/types/shared.types";
import {noop} from "src/utils/noop";
import {useCommonServices} from "src/contexts/commonServices.context";

const Certificates = () => {
  useCurrentPageTitle();
  const {authenticationService} = useCommonServices();
  const transactionService = useTransactionService();
  const {certificates, dictionaries} = useDomainStore();
  const {contentSize} = usePageData();
  const customerService = useCustomerService();

  const {
    searchValues,
    setIsSearchPanelOpen,
    isSearchPanelOpen,
    setSearchValues,
    clearSearchValues,
    activeSearchItems
  } = useSearch();

  const {
    itemInTransactionWindow,
    isTransactionsModalOpen,
    isTransactionsLoading,
    loadTransactions,
    closeTransactionsModal,
    transactions
  } = useTransactions((id) =>
    transactionService.loadCertificateTransactions(id)
  );

  const [isCreationFormOpen, setIsCreationFormOpen] = React.useState(false);

  const createCertificate = async (data: CertificateCreationBodyType) => {
    const certificate = await certificates.createCertificate(data);

    if (certificate) {
      setIsCreationFormOpen(false);

      certificates.searchCertificates({ids: certificate.ident});
      setSearchValues({ids: certificate.ident});

      return true;
    } else {
      return false;
    }
  };

  const searchCertificates = async (data: CertificateSearchBodyType) => {
    const success = await certificates.searchCertificates(data);

    if (success) {
      setIsSearchPanelOpen(false);
      setSearchValues(data);

      return true;
    }
    return false;
  };

  React.useEffect(() => {
    dictionaries.loadCinemaDictionary().then(() => {
      certificates.loadData();
    });

    return () => {
      customerService.clearCustomersInApp();
      certificates.reset();
    };
  }, []);

  return (
    <AppLayout
      toolbarCustomContent={
        <div className="Workspace__toolbar-item">
          <CustomerSearchButton customerService={customerService} />
        </div>
      }
    >
      <SubpagesToolbar
        customContent={
          <Toolbar
            openCreationPanel={() => setIsCreationFormOpen(true)}
            openSearchPanel={() => setIsSearchPanelOpen(true)}
            activeSearchItems={activeSearchItems}
          />
        }
      />
      <Drawer
        open={isCreationFormOpen}
        onClose={() => setIsCreationFormOpen(false)}
        anchor={"right"}
        classes={{paper: "Certificates__creation-form"}}
      >
        <CreationForm
          close={() => setIsCreationFormOpen(false)}
          cinemas={dictionaries.cinemaDictionary?.cinemas || []}
          onCreate={createCertificate}
          customerService={customerService}
        />
      </Drawer>
      <Drawer
        open={isSearchPanelOpen}
        onClose={() => setIsSearchPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Certificates__search-form"}}
      >
        <SearchPanel
          search={searchCertificates}
          close={() => setIsSearchPanelOpen(false)}
          onReset={() => {
            customerService.clearCustomersInApp();
            certificates.loadData();
            clearSearchValues();
          }}
          searchValues={searchValues}
        />
      </Drawer>
      <div className="Certificates" style={{height: contentSize.height}}>
        {certificates.isLoading ? (
          <Loader />
        ) : certificates.certificates ? (
          <Card>
            <div className="Certificates__table">
              <DataGrid
                rows={certificates.certificates}
                columns={getColumns(loadTransactions)}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {paginationModel: {pageSize: 10}}
                }}
                pageSizeOptions={[5, 10, 20]}
                showCellVerticalBorder
              />
            </div>
          </Card>
        ) : (
          <Typography variant="body1" textAlign="center" marginY={2}>
            Нет сертификатов
          </Typography>
        )}
      </div>

      <TransactionsWindow
        isRoot={authenticationService.isRoot}
        isOpen={isTransactionsModalOpen}
        onClose={closeTransactionsModal}
        loadTransactionHistory={(id) =>
          transactionService.loadTransactionChangesLog(id) as any
        }
        addButtonTooltip={
          "Транзакция будет добавлена в ТЕКУЩИЙ день. Вне зависимости от того, какая дата выбрана"
        }
        title={
          <Typography variant="h6">
            Информация о транзакциях сертификата:{" "}
            {(itemInTransactionWindow as Certificate)?.ident}
          </Typography>
        }
        transactions={transactions}
        onNewTransactionAdd={noop as any}
        makeRefund={noop as any}
        isLoading={isTransactionsLoading}
        isAddingDisabled={true}
        isRelatedReservationColumnHidden={true}
        isRelatedCertificateColumnHidden={true}
      />
    </AppLayout>
  );
};

export default observer(Certificates);
