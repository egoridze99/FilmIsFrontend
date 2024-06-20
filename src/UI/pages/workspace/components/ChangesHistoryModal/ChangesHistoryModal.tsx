import React from "react";
import {
  Box,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import "src/UI/pages/workspace/components/ChangesHistoryModal/changesHistoryModal.scss";
import {Moment} from "moment";

type ChangesHistoryModalProps = {
  isLoading: boolean;
  changesHistory: {
    author: string;
    created_at: Moment;
    id: number;
    data: {[key: string]: any};
  }[];
};

const ChangesHistoryModal: React.FC<ChangesHistoryModalProps> = ({
  changesHistory,
  isLoading
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
      <div className="ChangesHistoryModal__body">
        <div className="ChangesHistoryModal__content">
          {isLoading && (
            <Box className="ChangesHistoryModal__loader">
              <CircularProgress aria-describedby={"ChangesHistoryModal"} />
            </Box>
          )}
          {!isLoading &&
            (changes.length ? (
              <Box>
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
                          :{record.created_at.format("DD-MM-YYYY HH:mm")} (МСК)
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
              </Box>
            ) : (
              <Typography variant="body1" textAlign="center">
                История изменений пуста
              </Typography>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChangesHistoryModal;
