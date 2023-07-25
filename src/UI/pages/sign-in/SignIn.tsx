import React from "react";
import {useCommonServices} from "src/contexts/commonServices.context";
import {observer} from "mobx-react-lite";
import * as yup from "yup";
import {Form, Formik} from "formik";
import {ReactComponent as SignInIcon} from "./assets/authIcon.svg";
import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";

import "./signIn.scss";

const SignInSchema = yup.object().shape({
  login: yup.string().required("Необходимо ввести логин"),
  password: yup.string().required("Необходимо ввести пароль")
});

const initialFormValues = {
  login: "",
  password: ""
};

const SignIn = () => {
  const [error, setError] = React.useState<string>("");
  const {authenticationService, navigationService} = useCommonServices();

  const handleSubmit = async (formValues: typeof initialFormValues) => {
    const {error} = await authenticationService.signIn(
      formValues.login,
      formValues.password
    );

    if (error) {
      setError(error);
    }
  };

  if (authenticationService.isAuthenticated) {
    navigationService.navigateToRoot();
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialFormValues}
      validationSchema={SignInSchema}
    >
      {(formik) => (
        <div className="SignIn">
          <div className="SignIn__auth">
            <div className="SignIn__auth-left">
              <SignInIcon />
            </div>
            <div className="SignIn__auth-right">
              <h1 className="SignIn__title">Вход в приложение</h1>
              {error && <p className="SignIn__error">{error}</p>}
              <Form className="SignIn__form">
                <div className="SignIn__username-input SignIn__input">
                  <TextField
                    error={!!error}
                    size="small"
                    variant="standard"
                    fullWidth
                    label="Имя учетной записи"
                    placeholder="Введите логин"
                    {...formik.getFieldProps("login")}
                  />
                </div>
                <div className="SignIn__password-input SignIn__input">
                  <TextField
                    error={!!error}
                    size="small"
                    variant="standard"
                    fullWidth
                    placeholder="Пароль от учетной записи"
                    label="Введите пароль"
                    type="password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div className="SignIn__submit">
                  <LoadingButton
                    loading={authenticationService.isLoading}
                    loadingPosition="end"
                    fullWidth
                    variant="outlined"
                    disabled={
                      !formik.isValid && authenticationService.isLoading
                    }
                    type={"submit"}
                  >
                    Войти
                  </LoadingButton>
                </div>
              </Form>
              <div className="SignIn__info">
                <p className="SignIn__info-text">
                  Войдите со своей корпоративной учетной записью. <br />
                  Используйте ваш обычный пароль.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default observer(SignIn);
