import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import {Field, Form, Formik} from "formik";
import {getInitialValues} from "src/UI/pages/workspace/queue/components/QueueForm/helpers/getInitialValues";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import FormFooter from "src/UI/components/FormFooter";
import {TextField, Switch} from "formik-mui";
import {Box, FormControlLabel, MenuItem, Typography} from "@mui/material";
import {CinemaDictionary} from "src/models/dictionaries/cinema.dictionary.model";
import Datepicker from "src/UI/components/Datepicker";
import moment from "moment/moment";
import GeneralInputFields from "src/UI/pages/workspace/components/GeneralInputFields";
import {QueueItem, QueueItemStatusEnum} from "src/types/shared.types";
import {queueStatusDict} from "src/constants/statusDictionaries";
import {getSavableData} from "src/UI/pages/workspace/queue/components/QueueForm/helpers/getSavableData";
import {validationSchema} from "src/UI/pages/workspace/queue/components/QueueForm/helpers/validationSchema";
import {QueueCreationBodyType} from "src/types/queue/queue.dataClient.types";
import {CustomerService} from "src/services/customer.service";
import CustomerAutocomplete from "src/UI/components/Customer/CustomerAutocomplete";

export type QueueFormProps = {
  cinemaDictionary: CinemaDictionary | null;
  close(): void;
  onCreate(data: QueueCreationBodyType): Promise<void>;
  customerService: CustomerService;

  isEditMode?: boolean;
  queueItem?: QueueItem | null;
};

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

const QueueForm: React.FC<QueueFormProps> = ({
  close,
  isEditMode,
  onCreate,
  cinemaDictionary,
  queueItem,
  customerService
}) => {
  const roomsDict = cinemaDictionary?.cinemas.reduce((acc, i) => {
    i.rooms.forEach((r) => {
      acc[r.id] = r;
    });
    return acc;
  }, {});

  const onSubmit = async (values) => {
    const data = getSavableData(values);
    await onCreate(data);

    return true;
  };

  return (
    <>
      <SidePanelHeader
        title={`${
          isEditMode ? "Редактирование" : "Создание"
        } элемента в очереди`}
      />
      <div className="QueueForm side-panel-form">
        <Formik
          initialValues={getInitialValues(queueItem)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({isValid, isSubmitting, values, setFieldValue}) => {
            const currentQueueItemDate = queueItem
              ? queueItem.start_date
              : moment();
            const minAvailableDate = moment().isSameOrAfter(
              currentQueueItemDate,
              "day"
            )
              ? currentQueueItemDate
              : moment();

            return (
              <Form className="side-panel-form__form">
                <SidePanelContentContainer className="side-panel-form__body">
                  <Box className="full-width-form-control">
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
                            .map((id) => roomsDict?.[id]?.name)
                            .join(", ");
                        }
                      }}
                    >
                      {cinemaDictionary?.cinemas
                        ?.map((cinema) =>
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
                        ?.flat()}
                    </Field>
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={Datepicker}
                      minDate={minAvailableDate}
                      value={values.date}
                      name="date"
                      label="Дата"
                      placeholder="Выберите дату"
                      onChange={(val) => setFieldValue("date", val)}
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="start_time"
                      label="Время с"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="end_time"
                      label="Время по"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="guests_count"
                      label="Кол-во гостей"
                      variant="standard"
                      required
                    />
                  </Box>

                  <CustomerAutocomplete
                    name="contact"
                    label="Посетитель"
                    customerService={customerService}
                  />

                  <GeneralInputFields
                    fieldsToRender={["duration", "note"] as any}
                  />

                  <Box marginY={1}>
                    <FormControlLabel
                      control={
                        <Field
                          component={Switch}
                          name="has_another_reservation"
                        />
                      }
                      label="Есть другое бронирование"
                      labelPlacement="end"
                    />
                  </Box>

                  {queueItem && (
                    <>
                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={TextField}
                          type="text"
                          name="status"
                          label="Выберите желаемый статус"
                          select
                          variant="standard"
                        >
                          {Object.keys(QueueItemStatusEnum).map((status) => (
                            <MenuItem key={status} value={status}>
                              {queueStatusDict[status].title}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                    </>
                  )}
                </SidePanelContentContainer>
                <FormFooter
                  onCancel={close}
                  isLoading={isSubmitting}
                  isSubmitButtonDisabled={!isValid}
                  submitButtonText="Сохранить"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default QueueForm;
