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

import "./certificates.scss";

const Certificates = () => {
  useCurrentPageTitle();
  const {certificates} = useDomainStore();
  const {reduceSize, contentSize} = usePageData();

  const [isCreationFormOpen, setIsCreationFormOpen] = React.useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = React.useState(false);

  React.useEffect(() => {
    certificates.loadData();

    return () => certificates.reset();
  }, []);

  return (
    <AppLayout>
      <SubpagesToolbar
        customContent={
          <Toolbar
            openCreationPanel={() => setIsCreationFormOpen(true)}
            openSearchPanel={() => setIsSearchPanelOpen(true)}
          />
        }
      />
      <Drawer
        open={isCreationFormOpen}
        onClose={() => setIsCreationFormOpen(false)}
        anchor={"right"}
        classes={{paper: "Certificates__creation-form"}}
      >
        <CreationForm />
      </Drawer>
      <Drawer
        open={isSearchPanelOpen}
        onClose={() => setIsSearchPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Certificates__search-form"}}
      >
        <SearchPanel />
      </Drawer>
      <div className="Certificates" style={{height: contentSize.height}}>
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
      </div>
    </AppLayout>
  );
};

export default observer(Certificates);
