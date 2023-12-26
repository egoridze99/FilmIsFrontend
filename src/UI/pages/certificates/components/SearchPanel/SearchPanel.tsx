import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import {CertificateSearchBodyType} from "src/types/certificates/certificates.dataClient.types";
import {Field, Form, Formik} from "formik";
import SidePanelContentContainer from "src/UI/components/containers/SidePanelContentContainer";
import {Box} from "@mui/material";
import {TextField} from "formik-mui";
import PanelFormsFooter from "src/UI/components/PanelFormsFooter";
import {searchPanelDefaultValues} from "src/UI/pages/certificates/constants/searchPanelDefaultValues";

import "./searchPanel.scss";

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
      ids: values.ids ? (values.ids as any).split(" ") : undefined,
      telephones: values.telephones
        ? (values.telephones as any).split(" ")
        : undefined
    });
  };

  return (
    <>
      <SidePanelHeader title={"Поиск сертификатов"} />
      <div className="CertificatesSearchPanel">
        <Formik initialValues={searchValues} onSubmit={onSubmit}>
          {({isSubmitting, resetForm, submitForm}) => {
            return (
              <Form className="CertificatesSearchPanel__form">
                <SidePanelContentContainer className="CertificatesSearchPanel__form-body">
                  <p
                    className="CertificatesSearchPanel__reset"
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
