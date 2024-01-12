import React from "react";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {useDomainStore} from "src/contexts/store.context";
import {AppLayout} from "src/layouts";
import AdminToolbar from "src/UI/pages/admin/components/AdminToolbar";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";
import Loader from "../../../components/Loader";
import {DataGrid} from "@mui/x-data-grid";
import {Card, Drawer} from "@mui/material";
import {getColumns} from "./columns/getColumns";
import {observer} from "mobx-react-lite";
import {usePageData} from "../../../../contexts/pageData.context";
import ToolbarButton from "../../../components/ToolbarButton";
import UserCreationForm from "./components/CreationForm";
import {UserCreationBodyType} from "src/types/admin/admin.types";

import "./users.scss";

const Users = () => {
  useCurrentPageTitle();
  const {contentSize} = usePageData();

  const {admin} = useDomainStore();

  const [isCreationPanelOpen, setIsCreationPanelOpen] = React.useState(false);

  React.useEffect(() => {
    admin.getUsers();

    return () => admin.clearUsers();
  }, []);

  const handleCreateUser = async (values: UserCreationBodyType) => {
    const success = await admin.createNewUser(values);

    if (success) {
      setIsCreationPanelOpen(false);
    }
  };

  return (
    <AppLayout
      toolbarCustomContent={
        <AdminToolbar getTelephones={() => admin.getTelephones()} />
      }
    >
      <SubpagesToolbar
        customContent={
          <ToolbarButton onClick={() => setIsCreationPanelOpen(true)}>
            Создать пользователя
          </ToolbarButton>
        }
      />
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

      <Drawer
        open={isCreationPanelOpen}
        onClose={() => setIsCreationPanelOpen(false)}
        anchor={"right"}
        classes={{paper: "Users__creation-form"}}
      >
        <UserCreationForm
          close={() => setIsCreationPanelOpen(false)}
          submit={handleCreateUser}
        />
      </Drawer>
    </AppLayout>
  );
};

export default observer(Users);
