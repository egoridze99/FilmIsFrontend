import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import {CertificateSearchBodyType} from "src/types/certificates/certificates.dataClient.types";
import {Field, Form, Formik} from "formik";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import {Box} from "@mui/material";
import {TextField} from "formik-mui";
import FormFooter from "src/UI/components/FormFooter";
import {searchPanelDefaultValues} from "src/UI/pages/certificates/constants/searchPanelDefaultValues";

import "./searchPanel.scss";
import {validationSchema} from "src/UI/pages/certificates/components/SearchPanel/helpers/validationSchema";

type SearchPanelProps = {
  searchValues: CertificateSearchBodyType;
  close(): void;
  search(values: CertificateSearchBodyType): Promise<boolean>;
  onReset(): void;
};

const SearchPanel: React.FC<SearchPanelProps> = ({
  onReset,
  search,
  searchValues,
  close
}) => {
  const onSubmit = (values: CertificateSearchBodyType) => {
    return search({
      ids: values.ids || null,
      telephones: values.telephones || null
    });
  };

  return (
    <>
      <SidePanelHeader title={"Поиск сертификатов"} />
      <div className="CertificatesSearchPanel side-panel-form">
        <Formik
          initialValues={searchValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({isSubmitting, resetForm, isValid}) => {
            return (
              <Form className="side-panel-form__form">
                <SidePanelContentContainer className="side-panel-form__body">
                  <p
                    className="search-panel-reset-button"
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
                      name="ids"
                      label="Введите id сертификатов через пробел"
                      variant="standard"
                      multiline
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="telephones"
                      label="Введите номера телефонов через пробел"
                      variant="standard"
                      multiline
                    />
                  </Box>
                </SidePanelContentContainer>
                <FormFooter
                  isSubmitButtonDisabled={!isValid}
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
