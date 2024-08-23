import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import {Field, Form, Formik} from "formik";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import Datepicker from "src/UI/components/Datepicker";
import {Box} from "@mui/material";
import FormFooter from "src/UI/components/FormFooter";
import {Moment} from "moment";
import {DATE_FORMAT} from "src/constants/date";

import "./settingsPanel.scss";

type SettingsPanelProps = {
  onSubmit(values: {dateFrom: string; dateTo: string}): Promise<void>;
  close(): void;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  close,
  onSubmit: submit
}) => {
  const onSubmit = async (values: {
    dateFrom: Moment | null;
    dateTo: Moment | null;
  }) => {
    await submit({
      dateFrom: values.dateFrom ? values.dateFrom.format(DATE_FORMAT) : "",
      dateTo: values.dateTo ? values.dateTo.format(DATE_FORMAT) : ""
    });

    return true;
  };

  return (
    <>
      <SidePanelHeader title={"Настройка"} />
      <div className="SettingsPanel side-panel-form">
        <Formik
          initialValues={{dateFrom: null, dateTo: null, area: "cinema"}}
          onSubmit={onSubmit}
        >
          {({values, setFieldValue, isSubmitting}) => {
            return (
              <Form className="side-panel-form__form">
                <SidePanelContentContainer className="side-panel-form__body">
                  <Box className="full-width-form-control">
                    <Field
                      component={Datepicker}
                      value={values.dateFrom}
                      name="dateFrom"
                      label="Дата c"
                      placeholder="Выберите дату"
                      onChange={(val) => setFieldValue("dateFrom", val)}
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={Datepicker}
                      value={values.dateTo}
                      name="dateTo"
                      label="Дата по"
                      placeholder="Выберите дату"
                      onChange={(val) => setFieldValue("dateTo", val)}
                      required
                    />
                  </Box>
                </SidePanelContentContainer>
                <FormFooter
                  onCancel={close}
                  isLoading={isSubmitting}
                  submitButtonText="Применить"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default SettingsPanel;
