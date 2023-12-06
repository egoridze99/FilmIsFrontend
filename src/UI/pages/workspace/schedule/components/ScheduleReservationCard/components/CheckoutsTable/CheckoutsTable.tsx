import React from "react";
import {CheckoutType} from "src/types/shared.types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

type CheckoutsTableProps = {
  checkouts: CheckoutType[];
};

const CheckoutsTable: React.FC<CheckoutsTableProps> = ({checkouts}) => {
  if (!checkouts.length) {
    return null;
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">Заметка</TableCell>
            <TableCell component="th">Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkouts.map((checkout) => (
            <TableRow key={checkout.id}>
              <TableCell component="td" scope="row">
                {checkout.note}
              </TableCell>
              <TableCell component="td" scope="row">
                {checkout.sum}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default CheckoutsTable;
