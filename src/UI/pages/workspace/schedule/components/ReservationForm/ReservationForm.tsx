import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import {Form, Formik, Field, FieldArray} from "formik";
import {Box, Divider, MenuItem} from "@mui/material";
import {getInitialValues} from "./helpers/getInitialValues";
import {Certificate, Cinema, QueueItem} from "src/types/shared.types";
import {TextField} from "formik-mui";
import Datepicker from "src/UI/components/Datepicker";
import {getValidationSchema} from "./helpers/getValidationSchema";
import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import moment, {Moment} from "moment";
import {getSavableData} from "src/UI/pages/workspace/schedule/components/ReservationForm/helpers/getSavableData";
import {ReservationCreationBodyType} from "src/types/schedule/schedule.dataClient.types";
import {
  Reservation,
  ReservationStatus
} from "src/types/schedule/schedule.types";
import {reservationStatusDictionary} from "src/constants/statusDictionaries";
import CheckoutsSection from "./components/CheckoutsSection";
import GeneralInputFields from "src/UI/pages/workspace/components/GeneralInputFields";
import {TextField as MUITextField} from "@mui/material";

import "./ReservationForm.scss";
import {getCertificateNote} from "src/UI/pages/workspace/helpers/getCertificateNote";
import PanelFormsFooter from "src/UI/components/PanelFormsFooter";

type ReservationFormProps = {
  cinemas: Cinema[];
  close(): void;
  save(data: ReservationCreationBodyType): Promise<void>;

  reservation?: Reservation | QueueItem | null;
  isEditMode?: boolean;
  isCreationFromScratch?: boolean;
  loadCertificate?: (ident: string) => Promise<Certificate | null>;
};

const ReservationForm: React.FC<ReservationFormProps> = ({
  isEditMode = false,
  cinemas,
  close,
  save,
  reservation,
  loadCertificate,
  isCreationFromScratch
}) => {
  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  const cinemasAsDict = cinemas.reduce((acc, c) => ({...acc, [c.id]: c}), {});

  const scrollBottom = () => {
    bodyRef.current?.scroll({
      top: bodyRef.current?.scrollHeight,
      behavior: "smooth"
    });
  };

  const onSubmit = async (data: FormikInitialValuesType) => {
    const savableData = getSavableData(data, Boolean(isEditMode));
    await save(savableData);

    return true;
  };

  return (
    <>
      <SidePanelHeader
        title={`${isEditMode ? "Редактирование" : "Создание"} резерва`}
      />
      <div className="ReservationForm side-panel-form">
        <Formik
          initialValues={getInitialValues(
            cinemas,
            reservation,
            isCreationFromScratch
          )}
          onSubmit={onSubmit}
          validationSchema={getValidationSchema(isEditMode)}
          validateOnMount
        >
          {({values, isValid, setFieldValue, isSubmitting, initialValues}) => {
            const currentReservationDate = reservation
              ? isCreationFromScratch
                ? (reservation as QueueItem).start_date
                : (reservation as Reservation).date
              : moment.utc();

            const minAvailableDate = moment
              .utc()
              .isSameOrAfter(currentReservationDate, "day")
              ? currentReservationDate
              : moment.utc();

            const searchCertificate = async (
              e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              e.preventDefault();
              const ident = values.certificate_ident;
              if (!ident || !loadCertificate) {
                return;
              }

              const certificate = await loadCertificate(ident);
              if (!certificate) {
                return;
              }
              await setFieldValue("certificate", certificate);
            };

            const removeCertificate = async (
              e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              e.preventDefault();
              await setFieldValue("certificate", null);
              await setFieldValue("certificate_ident", "");
            };

            const setDate = (date: Moment) => {
              setFieldValue("date", date.toDate());
            };

            return (
              <Form className="side-panel-form__form">
                <SidePanelContentContainer
                  className="side-panel-form__body"
                  //@ts-ignore
                  ref={bodyRef}
                >
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
                      required
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
                      value={values.date ? moment.utc(values.date) : null}
                      name="date"
                      label="Дата"
                      placeholder="Выберите дату"
                      onChange={setDate}
                      minDate={minAvailableDate}
                      required
                    />
                  </Box>

                  <GeneralInputFields
                    fieldsToRender={
                      [
                        "time",
                        "duration",
                        "count",
                        "guest.name",
                        "guest.tel",
                        "film",
                        "note"
                      ] as any
                    }
                  />

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="rent"
                      label="Сумма аренды"
                      placeholder="Сумма аренды"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box
                    className="full-width-form-control ReservationForm__certificates"
                    marginY={1}
                  >
                    <Field
                      component={TextField}
                      name="certificate_ident"
                      label="id сертификата"
                      placeholder="id сертификата"
                      variant="standard"
                      disabled={
                        initialValues.status === ReservationStatus.finished
                      }
                    />
                    {initialValues.status !== ReservationStatus.finished && (
                      <div className="ReservationForm__certificates-controls">
                        {!values.certificate && (
                          <a href="#" onClick={searchCertificate}>
                            Поиск
                          </a>
                        )}
                        {values.certificate && (
                          <a href="#" onClick={removeCertificate}>
                            Удалить
                          </a>
                        )}
                      </div>
                    )}
                  </Box>

                  {values.certificate && (
                    <>
                      <Box className="full-width-form-control" marginY={1}>
                        <MUITextField
                          label="Примечание по сертификату"
                          variant="standard"
                          multiline
                          disabled
                          value={getCertificateNote(values.certificate)}
                        />
                      </Box>
                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={TextField}
                          name="certificate.sum"
                          label="Сумма сертификата"
                          placeholder="Сумма сертификата"
                          variant="standard"
                          disabled
                        />
                      </Box>
                    </>
                  )}

                  {reservation && isEditMode && (
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
                          {Object.keys(ReservationStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                              {reservationStatusDictionary[status].title}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>

                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={TextField}
                          name="card"
                          label="Картой"
                          placeholder="Картой"
                          variant="standard"
                        />
                      </Box>

                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={TextField}
                          name="cash"
                          label="Наличкой"
                          placeholder="Наличкой"
                          variant="standard"
                        />
                      </Box>

                      <Divider />
                      <div className="ReservationForm__checkouts">
                        <FieldArray
                          name={"checkouts"}
                          render={({push}) => {
                            return (
                              <CheckoutsSection
                                push={push}
                                checkouts={values.checkouts as any}
                                scrollBottom={scrollBottom}
                              />
                            );
                          }}
                        ></FieldArray>
                      </div>
                    </>
                  )}
                </SidePanelContentContainer>

                <PanelFormsFooter
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

export default ReservationForm;
