import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";

import "./creationForm.scss";
import {CertificateCreationBodyType} from "src/types/certificates/certificates.dataClient.types";
import {Field, Form, Formik} from "formik";
import {initialValues} from "src/UI/pages/certificates/components/CreationForm/helpers/initialValues";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import PanelFormsFooter from "src/UI/components/PanelFormsFooter";
import {TextField} from "formik-mui";
import {Box, MenuItem} from "@mui/material";
import {Cinema} from "src/types/shared.types";
import {CertificateServiceEnum} from "src/types/certificates/certificate.types";
import {validationSchema} from "src/UI/pages/certificates/components/CreationForm/helpers/validators";

type CreationFormProps = {
  onCreate(data: CertificateCreationBodyType): Promise<boolean>;
  close(): void;
  cinemas: Cinema[];
};

const CreationForm: React.FC<CreationFormProps> = ({
  close,
  cinemas,
  onCreate
}) => {
  const onSubmit = async (values: CertificateCreationBodyType) => {
    return onCreate({
      ...values,
      card: parseFloat(values.card as any),
      cash: parseFloat(values.cash as any),
      sum: parseFloat(values.sum as any)
    });
  };

  return (
    <>
      <SidePanelHeader title={"Создание сертификата"} />
      <div className="CertificateCreationForm side-panel-form">
        <Formik
          initialValues={initialValues as CertificateCreationBodyType}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({isSubmitting, isValid, errors}) => {
            return (
              <Form className="side-panel-form__form">
                <SidePanelContentContainer className="side-panel-form__body">
                  <Box className="full-width-form-control">
                    <Field
                      component={TextField}
                      type="text"
                      name="cinema_id"
                      label="Кинотеатр"
                      select
                      variant="standard"
                      required
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
                      name="contact"
                      label="Имя"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="telephone"
                      label="Телефон"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="sum"
                      label="Сумма сертификата"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="cash"
                      label="Наличкой"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="card"
                      label="Картой"
                      variant="standard"
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="service"
                      label="Услуга"
                      select
                      variant="standard"
                      required
                    >
                      {Object.values(CertificateServiceEnum).map((i) => (
                        <MenuItem key={i} value={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      multiline
                      name={"note"}
                      label="Заметка"
                      variant="standard"
                      rows={3}
                    />
                  </Box>
                </SidePanelContentContainer>
                <PanelFormsFooter
                  onCancel={close}
                  isLoading={isSubmitting}
                  isSubmitButtonDisabled={!isValid}
                  submitButtonText="Создать"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreationForm;
