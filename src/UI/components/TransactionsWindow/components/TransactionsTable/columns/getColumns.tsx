import {GridColDef} from "@mui/x-data-grid";
import {transactionTypeDictionary} from "src/constants/transactionDictionaries";
import React from "react";
import {Tooltip, Typography} from "@mui/material";
import {Transaction} from "src/models/transactions/transaction.model";
import moment from "moment";
import {TransactionStatusCell} from "src/UI/components/TransactionsWindow/components/TransactionsTable/columns/cells/TransactionStatusCell";
import {RefundButtonCell} from "src/UI/components/TransactionsWindow/components/TransactionsTable/columns/cells/RefundButtonCell";

export const getColumns = (props: {
  makeRefund: (id: Transaction) => void;
  isRelatedReservationColumnHidden?: boolean;
  isRelatedCertificateColumnHidden?: boolean;
  isRefundDisabled?: boolean;
}): GridColDef<Transaction>[] => {
  const columnTemplates = [
    {
      field: "id",
      headerName: "Идентификатор",
      width: 180,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title={params.row.id}>
          <Typography variant={"body2"} noWrap={true}>
            {params.row.id}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: "created_at",
      headerName: "Дата создания (МСК)",
      width: 180,
      sortable: true,
      filterable: false,
      valueGetter: (params) => {
        return moment(params.row.created_at).format("DD-MM-YYYY HH:mm");
      }
    },
    {
      field: "sum",
      headerName: "Сумма",
      width: 100,
      sortable: true,
      filterable: false
    },
    {
      field: "description",
      headerName: "Описание транзакции",
      width: 250,
      renderCell: (params) => (
        <Tooltip title={params.row.description}>
          <Typography variant={"body2"} noWrap={true}>
            {params.row.description}
          </Typography>
        </Tooltip>
      ),
      filterable: false
    },
    {
      field: "related_reservation_id",
      headerName: "Связанный резерв",
      width: 150,
      filterable: false
    },
    {
      field: "related_certificate_id",
      headerName: "Связанный сертификат",
      width: 170,
      filterable: false
    },
    {
      field: "author",
      headerName: "Автор",
      width: 160,
      valueGetter: (params) => params.row.author.fullname,
      filterable: false
    },
    {
      field: "transaction_type",
      headerName: "Тип транзакции",
      width: 180,
      valueGetter: (params) =>
        transactionTypeDictionary[params.row.transaction_type],
      filterable: false
    },
    {
      field: "transaction_status",
      headerName: "Статус транзакции",
      width: 180,
      filterable: false,
      renderCell: (params) => <TransactionStatusCell transaction={params.row} />
    },
    {
      field: "transaction_refund",
      headerName: "",
      width: 180,
      filterable: false,
      renderCell: (params) => (
        <RefundButtonCell
          disabled={props.isRefundDisabled}
          makeRefund={() => props.makeRefund(params.row)}
          transaction={params.row}
        />
      )
    }
  ] as GridColDef<Transaction>[];

  const columnsToShow = {
    id: true,
    created_at: true,
    sum: true,
    description: true,
    related_reservation_id: !props.isRelatedReservationColumnHidden,
    related_certificate_id: !props.isRelatedCertificateColumnHidden,
    author: true,
    transaction_type: true,
    transaction_status: true,
    transaction_refund: true
  };

  return columnTemplates.filter((c) => columnsToShow[c.field]);
};
