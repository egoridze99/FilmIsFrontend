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
import {getInitialValues} from "src/UI/components/Customer/CustomerEditingDialog/helpers/getInitialValues";
import Datepicker from "src/UI/components/Datepicker";
import moment, {Moment} from "moment/moment";
import {UserEditingFormValues} from "src/UI/components/Customer/CustomerEditingDialog/CustomerEditingDialog.types";
import {getSavableData} from "src/UI/components/Customer/CustomerEditingDialog/helpers/getSavableData";

import "src/UI/components/Customer/CustomerEditingDialog/customerEditingDialog.scss";
import {getValidationSchema} from "src/UI/components/Customer/CustomerEditingDialog/helpers/getValidationSchema";
import {CustomerRawType} from "src/types/customer/customer.types";
import {Customer} from "src/models/customers/customer.model";

type UserEditingDialogProps = {
  open: boolean;
  onClose(): void;

  onApply(data: CustomerRawType): Promise<boolean>;

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
  {
    name: "gender",
    kind: "checkbox",
    options: [{label: "М"}, {label: "Ж"}],
    required: true
  }
];

const CustomerEditingDialog: React.FC<UserEditingDialogProps> = ({
  open,
  onClose,
  isEditMode = false,
  onApply,
  defaultData
}) => {
  const onSubmit = async (values: UserEditingFormValues) => {
    const data = getSavableData(values);

    const result = await onApply(data as unknown as CustomerRawType);

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
          validationSchema={getValidationSchema()}
          initialValues={getInitialValues(defaultData)}
          onSubmit={onSubmit}
          validateOnMount
        >
          {({isSubmitting, setFieldValue, values, isValid, errors}) => {
            console.log(isValid);

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
                        <>
                          <Field
                            component={Datepicker}
                            maxDate={moment()}
                            value={
                              values[i.name] ? moment(values[i.name]) : null
                            }
                            name={i.name}
                            label={i.label}
                            placeholder="Выберите дату"
                            onChange={(date) => setDate(i.name, date)}
                            required
                          />
                          {errors[i.name] && (
                            <span className="UserEditingDialog__error">
                              {errors[i.name]}
                            </span>
                          )}
                        </>
                      );
                      break;
                    case "checkbox":
                      content = (
                        <Field
                          component={RadioGroup}
                          name={i.name}
                          row
                          required={i.required}
                        >
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

export default CustomerEditingDialog;
