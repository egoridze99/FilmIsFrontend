import React from "react";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {useDomainStore} from "src/contexts/store.context";
import {AppLayout} from "src/layouts";
import AdminToolbar from "src/UI/pages/admin/components/AdminToolbar";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import Loader from "../../../components/Loader";
import {DataGrid} from "@mui/x-data-grid";
import {Card} from "@mui/material";
import {getColumns} from "./columns/getColumns";
import {observer} from "mobx-react-lite";
import {usePageData} from "../../../../contexts/pageData.context";

import "./users.scss";

const Users = () => {
  useCurrentPageTitle();
  const {contentSize} = usePageData();

  const {admin} = useDomainStore();

  React.useEffect(() => {
    admin.getUsers();

    return () => admin.clearUsers();
  }, []);

  return (
    <AppLayout
      toolbarCustomContent={
        <AdminToolbar getTelephones={() => admin.getTelephones()} />
      }
    >
      <SubpagesToolbar />
      <div className="Users" style={{height: contentSize.height}}>
        {admin.isLoading ? (
          <Loader />
        ) : (
          <Card>
            <div className="Users__table">
              <DataGrid
                rows={admin.users}
                columns={getColumns((id) => admin.removeUser(id))}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {paginationModel: {pageSize: 10}}
                }}
                pageSizeOptions={[5, 10, 20]}
              />
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default observer(Users);
