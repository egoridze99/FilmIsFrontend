import React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getColumns} from "./columns/getColumns";
import {Transaction} from "src/models/transactions/transaction.model";

type TransactionsTableProps = {
  title?: React.ReactNode | React.ReactNode[];
  customContent?: React.ReactNode | React.ReactNode[];
  isLoading: boolean;
  transactions: Transaction[];
  makeRefund: (id: Transaction) => void;
  isRefundDisabled?: boolean;
  isRelatedReservationColumnHidden?: boolean;
  isRelatedCertificateColumnHidden?: boolean;
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  isLoading,
  customContent,
  transactions,
  title,
  makeRefund,
  isRefundDisabled,
  isRelatedReservationColumnHidden,
  isRelatedCertificateColumnHidden
}) => {
  return (
    <div className="TransactionsWindow__content-container">
      <div className="TransactionsWindow__title">
        {title}
        {customContent}
      </div>

      <div className="TransactionsWindow__content">
        {isLoading && (
          <Box className="TransactionsWindow__loader">
            <CircularProgress aria-describedby={"ChangesHistoryModal"} />
          </Box>
        )}

        {!isLoading &&
          (transactions.length ? (
            <div className={"TransactionsWindow__transactions"}>
              <DataGrid
                rows={transactions}
                columns={getColumns({
                  makeRefund,
                  isRefundDisabled,
                  isRelatedReservationColumnHidden,
                  isRelatedCertificateColumnHidden
                })}
                disableRowSelectionOnClick
                initialState={{
                  pagination: {paginationModel: {pageSize: 10}}
                }}
                pageSizeOptions={[5, 10, 20]}
              />
            </div>
          ) : (
            <div className={"TransactionsWindow__transactions"}>
              <Typography
                variant={"body1"}
                fontWeight={500}
                align={"center"}
                sx={{fontSize: 18}}
              >
                Нет связанных транзакций
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionsTable;
