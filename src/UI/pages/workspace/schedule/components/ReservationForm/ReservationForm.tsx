import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import {Form, Formik, Field, FormikHelpers} from "formik";
import {Box, Button, MenuItem} from "@mui/material";
import {getInitialValues} from "./helpers/getInitialValues";
import {Cinema} from "src/types/shared.types";
import {TextField} from "formik-mui";
import Datepicker from "src/UI/components/Datepicker";
import {getValidationSchema} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.constants";
import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import {Moment} from "moment";

import "./ReservationForm.scss";

type ReservationForm = {
  cinemas: Cinema[];
  close(): void;

  isEditMode?: boolean;
};

const ReservationForm: React.FC<ReservationForm> = ({
  isEditMode = false,
  cinemas,
  close
}) => {
  const cinemasAsDict = cinemas.reduce((acc, c) => ({...acc, [c.id]: c}), {});

  const onSubmit = (
    value: FormikInitialValuesType,
    helpers: FormikHelpers<FormikInitialValuesType>
  ) => {
    console.log(value);
    console.log(helpers);
  };

  return (
    <>
      <SidePanelHeader
        title={`${isEditMode ? "Редактирование" : "Создание"} резерва`}
      />
      <div className="ReservationForm">
        <Formik
          initialValues={getInitialValues()}
          onSubmit={onSubmit}
          validationSchema={getValidationSchema()}
          validateOnMount
        >
          {({values, isValid, setFieldValue}) => {
            const setDate = (date: Moment) => {
              setFieldValue("date", date.toDate());
            };

            return (
              <Form className="ReservationForm__form">
                <SidePanelContentContainer className="ReservationForm__body">
                  <Box className="full-width-form-control">
                    <Field
                      component={TextField}
                      type="text"
                      name="cinema"
                      label="Кинотеатр"
                      select
                      variant="standard"
                    >
                      {cinemas.map((cinema) => (
                        <MenuItem key={cinema.id} value={cinema.id}>
                          {cinema.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="room"
                      label="Кинозал"
                      select
                      variant="standard"
                      disabled={values.cinema === null}
                    >
                      {cinemasAsDict[values.cinema as number]?.rooms.map(
                        (room) => (
                          <MenuItem key={room.id} value={room.id}>
                            {room.name}
                          </MenuItem>
                        )
                      )}
                    </Field>
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={Datepicker}
                      name="date"
                      label="Дата"
                      placeholder="Выберите дату"
                      onChange={setDate}
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="time"
                      label="Время"
                      placeholder="Время в формате HH:MM"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="duration"
                      label="Продолжительность"
                      placeholder="Продолжительность сеанса"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="count"
                      label="Кол-во гостей"
                      placeholder="Кол-во госте"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="guest.name"
                      label="Имя гостя"
                      placeholder="Имя гостя"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="guest.tel"
                      label="Номер телефона гостя"
                      placeholder="Номер телефона гостя"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="film"
                      label="Фильм"
                      placeholder="Фильм"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      multiline
                      name="note"
                      label="Примечание"
                      placeholder="Примечание"
                      variant="standard"
                      rows={3}
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="rent"
                      label="Сумма аренды"
                      placeholder="Сумма аренды"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="certificate_ident"
                      label="id сертификата"
                      placeholder="id сертификата"
                      variant="standard"
                    />
                  </Box>
                </SidePanelContentContainer>
                <div className="ReservationForm__footer">
                  <Button onClick={close} variant={"outlined"}>
                    Отмена
                  </Button>
                  <Button type="submit" variant="contained" disabled={!isValid}>
                    Сохранить
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default ReservationForm;
