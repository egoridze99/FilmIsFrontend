import {GridColDef} from "@mui/x-data-grid";
import {UserInfo} from "../../../../../types/shared.types";
import {Roles} from "../../../../../types/core.types";
import React from "react";
import {Button} from "@mui/material";

const roles = {
  [Roles.root]: "Суперадмин",
  [Roles.admin]: "Администратор",
  [Roles.operator]: "Оператор"
};

export const getColumns = (
  removeUser: (id: number) => void
): GridColDef<UserInfo>[] => {
  return [
    {
      field: "id",
      headerName: "id",
      width: 100,
      sortable: true
    },
    {
      field: "fullname",
      headerName: "ФИО",
      width: 350,
      sortable: true
    },
    {
      field: "role",
      headerName: "Роль",
      width: 150,
      sortable: true,
      valueGetter: (params) => roles[params.row.role]
    },
    {
      field: "login",
      headerName: "Логин",
      width: 250,
      sortable: true
    },
    {
      field: "remove",
      headerName: "",
      width: 250,
      sortable: true,
      renderCell: (params) => (
        <Button onClick={() => removeUser(params.row.id)} variant="contained">
          Удалить пользователя
        </Button>
      )
    }
  ];
};
