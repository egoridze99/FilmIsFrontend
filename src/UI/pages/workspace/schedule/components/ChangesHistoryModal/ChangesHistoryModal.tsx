import React from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import "./changesHistoryModal.scss";

type ChangesHistoryModalProps = {
  changesHistory: {
    author: string;
    created_at: string;
    id: number;
    data: {[key: string]: any};
  }[];
};

const ChangesHistoryModal: React.FC<ChangesHistoryModalProps> = ({
  changesHistory
}) => {
  const changes = changesHistory
    .map((item) => {
      const data = Object.keys(item.data).map((field) => ({
        field,
        was: item.data[field].old,
        is: item.data[field].new
      }));

      return {...item, data};
    })
    .filter((i) => i.data.length);

  return (
    <div className="ChangesHistoryModal">
      <div className="ChangesHistoryModal__content">
        {changes.length ? (
          <div className="ChangesHistoryModal__changes-history">
            <Typography variant="h5">История изменений</Typography>
            {changes.map((record) => (
              <Box marginY={2}>
                <Card className="ChangesHistoryModal__card">
                  <div className="ChangesHistoryModal__card-header">
                    <p className="ChangesHistoryModal__card-header-text">
                      <span className="ChangesHistoryModal__card-header-text_bold">
                        Автор
                      </span>
                      : {record.author}
                    </p>
                    <p className="ChangesHistoryModal__card-header-text">
                      <span className="ChangesHistoryModal__card-header-text_bold">
                        Когда сделаны изменения
                      </span>
                      :{record.created_at}
                    </p>
                  </div>

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell component="th">Поле</TableCell>
                        <TableCell component="th">Было</TableCell>
                        <TableCell component="th">Стало</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {record.data.map(({field, was, is}) => (
                        <TableRow key={field}>
                          <TableCell component="td" scope="row">
                            {field}
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {was}
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {is}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </Box>
            ))}
          </div>
        ) : (
          <Typography variant="body1" textAlign="center">
            История изменений пуста
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ChangesHistoryModal;
