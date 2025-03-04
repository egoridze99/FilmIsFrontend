import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";

import "./creationForm.scss";
import {CertificateCreationBodyType} from "src/types/certificates/certificates.dataClient.types";
import {Field, FieldArray, Form, Formik} from "formik";
import {initialValues} from "src/UI/pages/certificates/components/CreationForm/helpers/initialValues";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import FormFooter from "src/UI/components/FormFooter";
import {TextField} from "formik-mui";
import {Box, Divider, MenuItem} from "@mui/material";
import {Cinema} from "src/types/shared.types";
import {CertificateServiceEnum} from "src/types/certificates/certificate.types";
import {validationSchema} from "src/UI/pages/certificates/components/CreationForm/helpers/validators";
import CustomerAutocomplete from "src/UI/components/Customer/CustomerAutocomplete";
import {CustomerService} from "src/services/customer.service";
import TransactionsSection from "./components/TransactionsSection";
import {Customer} from "src/models/customers/customer.model";

type CreationFormProps = {
  onCreate(data: CertificateCreationBodyType): Promise<boolean>;
  close(): void;
  cinemas: Cinema[];
  customerService: CustomerService;
};

const CreationForm: React.FC<CreationFormProps> = ({
  close,
  cinemas,
  onCreate,
  customerService
}) => {
  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  const onSubmit = async (values: CertificateCreationBodyType) => {
    return onCreate({
      ...values,
      contact: (values.contact as unknown as Customer).id as number,
      sum: parseFloat(values.sum as any),
      transactions: values.transactions.map((t) => ({
        ...t,
        sum: parseInt(t.sum as any)
      }))
    });
  };

  const scrollBottom = () => {
    bodyRef.current?.scroll({
      top: bodyRef.current?.scrollHeight,
      behavior: "smooth"
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
          {({isSubmitting, isValid, errors, values}) => {
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

                  <CustomerAutocomplete
                    name={"contact"}
                    label={"Владелец сертификата"}
                    customerService={customerService}
                    required
                  />

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

                  <Divider />
                  <div className="CertificateCreationForm__transactions">
                    <FieldArray
                      name={"transactions"}
                      render={({push}) => {
                        return (
                          <TransactionsSection
                            push={push}
                            transactions={values.transactions as any}
                            scrollBottom={scrollBottom}
                          />
                        );
                      }}
                    ></FieldArray>
                  </div>
                </SidePanelContentContainer>
                <FormFooter
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
