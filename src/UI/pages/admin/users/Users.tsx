import React from "react";
import {useCurrentPageTitle} from "src/hooks/useCurrentPageTitle";
import {useDomainStore} from "src/contexts/store.context";
import {AppLayout} from "src/layouts";
import AdminToolbar from "src/UI/pages/admin/components/AdminToolbar";
import SubpagesToolbar from "src/UI/components/SubpagesToolbar";

const Users = () => {
  useCurrentPageTitle();

  const {admin} = useDomainStore();

  React.useEffect(() => () => admin.clearUsers(), []);

  return (
    <AppLayout
      toolbarCustomContent={
        <AdminToolbar getTelephones={() => admin.getTelephones()} />
      }
    >
      <SubpagesToolbar />
      <div className="">It's users page</div>
    </AppLayout>
  );
};

export default Users;
