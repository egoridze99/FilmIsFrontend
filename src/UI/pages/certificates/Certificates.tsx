import React from "react";
import {AppLayout} from "src/layouts";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {usePageData} from "src/contexts/pageData.context";
import {useDomainStore} from "src/contexts/store.context";
import {DataGrid} from "@mui/x-data-grid";
import {columns} from "src/UI/pages/certificates/columns/getColumns";
import {observer} from "mobx-react-lite";
import {Card, Drawer} from "@mui/material";
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

const Certificates = () => {
  useCurrentPageTitle();
  const {certificates, dictionaries} = useDomainStore();
  const {contentSize} = usePageData();

  const {
    searchValues,
    setIsSearchPanelOpen,
    isSearchPanelOpen,
    setSearchValues,
    clearSearchValues,
    activeSearchItems
  } = useSearch();

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

    return () => certificates.reset();
  }, []);

  return (
    <AppLayout>
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
            certificates.loadData();
            clearSearchValues();
          }}
          searchValues={searchValues}
        />
      </Drawer>
      <div className="Certificates" style={{height: contentSize.height}}>
        {certificates.isLoading ? (
          <Loader />
        ) : (
          <Card>
            <div className="Certificates__table">
              <DataGrid
                rows={certificates.certificates}
                columns={columns}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {paginationModel: {pageSize: 10}}
                }}
                pageSizeOptions={[5, 10, 20]}
                showCellVerticalBorder
              />
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default observer(Certificates);
