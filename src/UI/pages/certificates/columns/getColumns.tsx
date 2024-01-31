import {GridColDef} from "@mui/x-data-grid";
import {Certificate} from "src/types/shared.types";
import {certificatesStatusDictionary} from "src/constants/statusDictionaries";

export const columns = [
  {
    field: "ident",
    headerName: "id",
    width: 90,
    sortable: true
  },
  {
    field: "cinema",
    headerName: "Кинотеатр",
    width: 200,
    sortable: true,
    valueGetter: (p) => p.row.cinema.name
  },
  {
    field: "created_at",
    headerName: "Дата создания",
    width: 120,
    sortable: true,
    valueGetter: (p) => p.row.created_at.format("DD-MM-YYYY")
  },
  {
    field: "status",
    headerName: "Статус",
    width: 100,
    sortable: true,
    valueGetter: (p) => certificatesStatusDictionary[p.row.status]
  },
  {
    field: "sum",
    headerName: "Сумма",
    width: 100,
    sortable: true
  },
  {
    field: "service",
    headerName: "Услуга",
    width: 120,
    sortable: true
  },
  {
    field: "note",
    headerName: "Примечание",
    width: 200,
    sortable: true
  },
  {
    field: "author",
    headerName: "Автор",
    width: 200,
    sortable: true,
    valueGetter: (p) => p.row.author.fullname
  },
  {
    field: "name",
    headerName: "Имя",
    width: 100,
    sortable: true,
    valueGetter: (p) => p.row.contact.name
  },
  {
    field: "telephone",
    headerName: "Телефон",
    width: 200,
    sortable: true,
    valueGetter: (p) => p.row.contact.telephone
  }
] as GridColDef<Certificate>[];
