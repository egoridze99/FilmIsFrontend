import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  Tooltip,
  Typography
} from "@mui/material";
import {Download} from "@mui/icons-material";

import "./adminToolbar.scss";
import CustomerSearchButton from "src/UI/components/Customer/CustomerSearchButton/CustomerSearchButton";
import {CustomerService} from "src/services/customer.service";
import {Field, Form, Formik} from "formik";
import {useDomainStore} from "src/contexts/store.context";
import {DictionariesEnum} from "src/types/core.types";
import {observer} from "mobx-react-lite";
import Loader from "src/UI/components/Loader";
import {RadioGroup, TextField} from "formik-mui";
import Datepicker from "src/UI/components/Datepicker";
import moment from "moment/moment";
import {Moment} from "moment";
import {
  initialValues,
  TelephonesFormInitialValues
} from "src/UI/pages/admin/components/AdminToolbar/helpers/telephones/initialValues";
import {telephoneValidators} from "src/UI/pages/admin/components/AdminToolbar/helpers/telephones/validators";
import {DATE_FORMAT} from "src/constants/date";

export type AdminToolbarProps = {
  getTelephones(data: {
    city: number;
    min_visits: number;
    last_visit_threshold: string;
    ignore_before_date: string;
  }): Promise<void>;
  customerService: CustomerService;
};

const AdminToolbar: React.FC<AdminToolbarProps> = ({
  getTelephones,
  customerService
}) => {
  const {dictionaries} = useDomainStore();

  const [isGetTelephonesModalOpen, setIsGetTelephonesModalOpen] =
    React.useState(false);

  const loadTelephones = async (values: TelephonesFormInitialValues) => {
    const payload = {} as any;

    if (values.city) {
      payload.city = values.city;
    }

    if (values.min_visits) {
      payload.min_visits = parseInt(values.min_visits as any);
    }

    if (values.last_visit_threshold) {
      payload.last_visit_threshold = moment(values.last_visit_threshold).format(
        DATE_FORMAT
      );
    }

    if (values.ignore_before_date) {
      payload.ignore_before_date = moment(values.ignore_before_date).format(
        DATE_FORMAT
      );
    }

    await getTelephones(payload);
    setIsGetTelephonesModalOpen(false);
  };

  return (
    <div className="AdminToolbar">
      <div className="AdminToolbar__item">
        <CustomerSearchButton customerService={customerService} />
      </div>

      <Tooltip
        title={"Загрузить телефонные номера"}
        className="AdminToolbar__item"
      >
        <IconButton
          onClick={async () => {
            setIsGetTelephonesModalOpen(true);
            await dictionaries.loadCityDictionary();
          }}
        >
          <Download color={"inherit"} style={{color: "#fff"}} />
        </IconButton>
      </Tooltip>

      <Modal
        open={isGetTelephonesModalOpen}
        onClose={() => {
          dictionaries.resetDictionary(DictionariesEnum.CityDictionary);
          setIsGetTelephonesModalOpen(false);
        }}
      >
        <Box className="AdminToolbar__modal-body">
          <Typography variant="h6">Выгрузка телефонных номеров</Typography>

          {dictionaries.loaders.cityDictionary ? (
            <Loader />
          ) : (
            <Formik
              validateOnMount
              validationSchema={telephoneValidators}
              initialValues={initialValues}
              onSubmit={loadTelephones}
            >
              {({setFieldValue, values, isValid, isSubmitting, submitForm}) => {
                const setDate = (field: string, date: Moment) => {
                  setFieldValue(field, date.toDate());
                };

                if (isSubmitting) {
                  return <Loader />;
                }

                return (
                  <div className="AdminToolbar__telephones-form-container">
                    <Form className="AdminToolbar__telephones-form">
                      <Box className={"full-width-form-control"}>
                        <FormControl>
                          <FormLabel required>Выбор города</FormLabel>
                          <Field component={RadioGroup} row name="city">
                            {dictionaries.cityDictionary?.cities?.map(
                              (city) => (
                                <FormControlLabel
                                  value={city.id}
                                  control={<Radio />}
                                  label={city.name}
                                />
                              )
                            )}
                          </Field>
                        </FormControl>
                      </Box>

                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={TextField}
                          name="min_visits"
                          label="Минимальное кол-во визитов"
                          placeholder="Минимальное кол-во визитов"
                          variant="standard"
                          required
                        />
                      </Box>

                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={Datepicker}
                          value={
                            values.last_visit_threshold
                              ? moment(values.last_visit_threshold)
                              : null
                          }
                          name="last_visit_threshold"
                          label="С какого числа не посещал заведение"
                          placeholder="С какого числа не посещал заведение"
                          onChange={(val) =>
                            setDate("last_visit_threshold", val)
                          }
                          required
                        />
                      </Box>

                      <Box className="full-width-form-control" marginY={1}>
                        <Field
                          component={Datepicker}
                          value={
                            values.ignore_before_date
                              ? moment(values.ignore_before_date)
                              : null
                          }
                          name="ignore_before_date"
                          label="Нижний порог посещения. (Если последний визит раньше заданной даты - игнор)"
                          placeholder="Нижний порог посещения. (Если последний визит раньше заданной даты - игнор)"
                          onChange={(val) => setDate("ignore_before_date", val)}
                          required
                        />
                      </Box>
                    </Form>

                    <div className="AdminToolbar__telephones-form-submit-btn">
                      <Button
                        variant="contained"
                        disabled={!isValid || isSubmitting}
                        onClick={submitForm}
                      >
                        Загрузить телефонные номера
                      </Button>
                    </div>
                  </div>
                );
              }}
            </Formik>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default observer(AdminToolbar);
