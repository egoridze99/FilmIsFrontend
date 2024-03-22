import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio
} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {RadioGroup, TextField} from "formik-mui";
import FormFooter from "src/UI/components/FormFooter";
import {Customer} from "src/types/customer.types";

import "./userEditingDialog.scss";
import {getInitialValues} from "src/UI/components/UserEditingDialog/helpers/getInitialValues";
import Datepicker from "src/UI/components/Datepicker";
import moment, {Moment} from "moment/moment";
import {UserEditingFormValues} from "src/UI/components/UserEditingDialog/UserEditingDialog.types";
import {getSavableData} from "./helpers/getSavableData";

type UserEditingDialogProps = {
  open: boolean;
  onClose(): void;

  onApply(data: Customer): Promise<boolean>;

  defaultData?: Customer;
  isEditMode?: boolean;
};

const textFormFields = [
  {name: "name", label: "Имя", required: true, kind: "text"},
  {name: "surname", label: "Фамилия", kind: "text"},
  {name: "patronymic", label: "Отчество", kind: "text"},
  {name: "telephone", label: "Номер телефона", required: true, kind: "text"},
  {name: "birthday_date", label: "Дата рождения", kind: "datepicker"},
  {name: "birthplace", label: "Место рождения", kind: "text"},
  {name: "passport_issued_by", label: "Кем выдан паспорт", kind: "text"},
  {
    name: "passport_issue_date",
    label: "Дата выдачи паспорта",
    kind: "datepicker"
  },
  {name: "department_code", label: "Код подразделения", kind: "text"},
  {name: "passport_identity", label: "Серия и номер паспорта", kind: "text"},
  {name: "gender", kind: "checkbox", options: [{label: "М"}, {label: "Ж"}]}
];

const UserEditingDialog: React.FC<UserEditingDialogProps> = ({
  open,
  onClose,
  isEditMode = false,
  onApply,
  defaultData
}) => {
  const onSubmit = async (values: UserEditingFormValues) => {
    const data = getSavableData(values);

    const result = await onApply(data as Customer);

    if (result) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="UserEditingDialog">
      <DialogTitle>
        {isEditMode ? "Редактирование" : "Создание нового"} пользователя
      </DialogTitle>
      <></>
      <DialogContent className="UserEditingDialog__content">
        <Formik
          initialValues={getInitialValues(defaultData)}
          onSubmit={onSubmit}
        >
          {({isSubmitting, setFieldValue, values, isValid}) => {
            const setDate = (field: string, date: Moment) => {
              setFieldValue(field, date.toDate());
            };

            return (
              <Form>
                {textFormFields.map((i, index) => {
                  let content: React.ReactNode | null = null;

                  switch (i.kind) {
                    case "datepicker":
                      content = (
                        <Field
                          component={Datepicker}
                          value={values[i.name] ? moment(values[i.name]) : null}
                          name="date"
                          label="Дата"
                          placeholder="Выберите дату"
                          onChange={(date) => setDate(i.name, date)}
                          required
                        />
                      );
                      break;
                    case "checkbox":
                      content = (
                        <Field component={RadioGroup} name={i.name} row>
                          {i.options?.map((option) => (
                            <FormControlLabel
                              value={option.label}
                              control={<Radio />}
                              label={option.label}
                            />
                          ))}
                        </Field>
                      );
                      break;
                    default:
                      content = (
                        <Field
                          component={TextField}
                          name={i.name}
                          label={i.label}
                          variant="standard"
                          required={i.required}
                        />
                      );
                  }

                  return (
                    <Box
                      className="full-width-form-control"
                      marginY={index === 0 ? undefined : 1}
                    >
                      {content}
                    </Box>
                  );
                })}

                <FormFooter
                  onCancel={onClose}
                  cancelButtonText="Отмена"
                  className="UserEditingDialog__footer"
                  isLoading={isSubmitting}
                  isSubmitButtonDisabled={isSubmitting || !isValid}
                />
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditingDialog;
