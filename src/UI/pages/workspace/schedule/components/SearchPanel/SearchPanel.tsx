import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {Box, MenuItem, Typography} from "@mui/material";
import {ReservationStatus} from "src/types/schedule/schedule.types";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import {Cinema} from "src/types/shared.types";
import Datepicker from "src/UI/components/Datepicker";
import PanelFormsFooter from "src/UI/components/PanelFormsFooter";
import {ReservationSearchBodyType} from "src/types/schedule/schedule.dataClient.types";

import "./searchPanel.scss";
import {searchPanelDefaultValues} from "src/UI/pages/workspace/schedule/constants/searchPanelDefaultValues";
import moment from "moment";

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const RoomSelectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type SearchPanelProps = {
  searchValues: ReservationSearchBodyType;
  close(): void;
  search(values: ReservationSearchBodyType): Promise<void>;
  onReset(): void;
  cinemas: Cinema[];
};

const SearchPanel: React.FC<SearchPanelProps> = ({
  cinemas,
  close,
  search,
  searchValues,
  onReset
}) => {
  const roomsDict = cinemas.reduce((acc, i) => {
    i.rooms.forEach((r) => {
      acc[r.id] = r;
    });
    return acc;
  }, {});

  const handleSearch = async (values: ReservationSearchBodyType) => {
    await search(values);

    return true;
  };

  return (
    <>
      <SidePanelHeader title="Поиск среди резервов" />
      <div className="SearchPanel">
        <Formik initialValues={searchValues} onSubmit={handleSearch}>
          {({values, setFieldValue, isSubmitting, resetForm, submitForm}) => {
            return (
              <Form className="SearchPanel__form">
                <SidePanelContentContainer className="SearchPanel__form-body">
                  <p
                    className="SearchPanel__reset"
                    onClick={() => {
                      resetForm({values: searchPanelDefaultValues});
                      onReset();
                    }}
                  >
                    Очистить поиск
                  </p>

                  <Box className="full-width-form-control">
                    <Field
                      component={TextField}
                      type="text"
                      name="statuses"
                      label="Cтатусы"
                      select
                      variant="standard"
                      SelectProps={{
                        multiple: true,
                        displayEmpty: true
                      }}
                    >
                      {Object.values(ReservationStatus).map((status) => (
                        <MenuItem key={status} value={status}>
                          {reservationStatusDictionary[status].title}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="rooms"
                      label="Кинозалы"
                      select
                      variant="standard"
                      SelectProps={{
                        multiple: true,
                        displayEmpty: true,
                        MenuProps: RoomSelectMenuProps,
                        renderValue: (value: number[]) => {
                          return value
                            .map((id) => roomsDict[id].name)
                            .join(", ");
                        }
                      }}
                    >
                      {cinemas
                        .map((cinema) =>
                          cinema.rooms.map((room) => (
                            <MenuItem key={room.id} value={room.id}>
                              <div className="SearchPanel__room-select-item">
                                <Typography variant="body1">
                                  {room.name}
                                </Typography>
                                <Typography variant="subtitle2">
                                  {cinema.name}
                                </Typography>
                              </div>
                            </MenuItem>
                          ))
                        )
                        .flat()}
                    </Field>
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="reservation_id"
                      label="Введите id резервов через пробел"
                      variant="standard"
                      multiline
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="telephone"
                      label="Введите номера телефонов через пробел"
                      variant="standard"
                      multiline
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={Datepicker}
                      value={
                        values.start_date ? moment(values.start_date) : null
                      }
                      name="start_date"
                      label="Диапазон дат с"
                      onChange={(val) =>
                        setFieldValue("start_date", val.toDate())
                      }
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={Datepicker}
                      value={values.end_date ? moment(values.end_date) : null}
                      name="end_date"
                      label="Диапазон дат по"
                      onChange={(val) =>
                        setFieldValue("end_date", val.toDate())
                      }
                    />
                  </Box>
                </SidePanelContentContainer>
                <PanelFormsFooter
                  onCancel={close}
                  isLoading={isSubmitting}
                  submitButtonText="Поиск"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default SearchPanel;
