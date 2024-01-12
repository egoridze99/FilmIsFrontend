import React from "react";
import SidePanelHeader from "src/UI/components/SidePanelHeader";
import SidePanelContentContainer from "../../../../../components/containers/SidePanelContentContainer";
import {Field, Form, Formik} from "formik";
import {UserCreationBodyType} from "../../../../../../types/admin/admin.types";
import {initialValues} from "./helpers/initialValues";
import {validators} from "./helpers/validators";

import "./CreationForm.scss";
import {TextField} from "formik-mui";
import {Box, MenuItem} from "@mui/material";
import {Roles} from "../../../../../../types/core.types";
import {rolesDictionary} from "../../../../../../constants/rolesDictionary";
import PanelFormsFooter from "../../../../../components/PanelFormsFooter";

export type UserCreationForm = {
  close(): void;
  submit(data: UserCreationBodyType): Promise<void>;
};

const UserCreationForm: React.FC<UserCreationForm> = ({close, submit}) => {
  const onSubmit = async (values: UserCreationBodyType) => {
    await submit(values);

    return true;
  };

  return (
    <>
      <SidePanelHeader title="Создание пользователя" />
      <div className="UserCreationForm side-panel-form">
        <Formik
          initialValues={initialValues as UserCreationBodyType}
          onSubmit={onSubmit}
          validationSchema={validators}
          validateOnMount
        >
          {({isSubmitting, isValid, errors}) => {
            return (
              <Form className="side-panel-form__form">
                <SidePanelContentContainer className="side-panel-form__body">
                  <Box className="full-width-form-control">
                    <Field
                      component={TextField}
                      name="login"
                      label="Логин"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="password"
                      label="Пароль"
                      variant="standard"
                      type="password"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="name"
                      label="Имя"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="surname"
                      label="Фамилия"
                      variant="standard"
                      required
                    />
                  </Box>

                  <Box className="full-width-form-control" marginY={1}>
                    <Field
                      component={TextField}
                      name="role"
                      label="Роль"
                      variant="standard"
                      select
                      required
                    >
                      {Object.values(Roles).map((role) => (
                        <MenuItem key={role} value={role}>
                          {rolesDictionary[role]}
                        </MenuItem>
                      ))}
                    </Field>
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

export default UserCreationForm;
