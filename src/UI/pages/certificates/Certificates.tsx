import React from "react";
import {AppLayout} from "src/layouts";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {usePageData} from "src/contexts/pageData.context";
import {useDomainStore} from "src/contexts/store.context";
import ContentContainer from "src/UI/components/containers/ContentContainer";
import {DataGrid} from "@mui/x-data-grid";
import {columns} from "src/UI/pages/certificates/columns/getColumns";
import {observer} from "mobx-react-lite";
import {Card} from "@mui/material";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import Toolbar from "./components/Toolbar";

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
