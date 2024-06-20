import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  Typography
} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {RadioGroup, TextField} from "formik-mui";
import {transactionTypeDictionary} from "src/constants/transactionDictionaries";
import {LoadingButton} from "@mui/lab";
import * as yup from "yup";
import {
  TransactionCreationType,
  TransactionTypeEnum
} from "src/types/transactions/transactions.types";

type TransactionFormProps = {
  onNewTransactionAdd: (values: TransactionCreationType) => Promise<boolean>;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  onNewTransactionAdd
}) => {
  const onSubmit = async (
    values: TransactionCreationType & {
      transaction_variant: "income" | "expense";
    }
  ) => {
    const sum = parseInt(values["sum"] as any) || 0;

    return await onNewTransactionAdd({
      transaction_type: values["transaction_type"],
      description: values["description"],
      sum: values["transaction_variant"] === "income" ? sum : -sum
    });
  };

  return (
    <div className="TransactionsWindow__content-container">
      <div className="TransactionsWindow__title">
        <Typography variant="h6">Создание транзакции</Typography>
      </div>

      <div className="TransactionsWindow__content">
        <div className="TransactionsWindow__creation-form-container">
          <Formik
            validateOnMount
            initialValues={
              {
                transaction_variant: "income",
                sum: null as any,
                description: null as any,
                transaction_type: TransactionTypeEnum.cash
              } as TransactionCreationType & {
                transaction_variant: "income" | "expense";
              }
            }
            validationSchema={yup.object().shape({
              sum: yup.number().required("Обязательно к заполнению")
            })}
            onSubmit={onSubmit}
          >
            {({isSubmitting, isValid}) => {
              return (
                <Form className={"TransactionsWindow__creation-form"}>
                  <Box className={"full-width-form-control"}>
                    <Field
                      component={TextField}
                      name="sum"
                      label="Сумма транзакции"
                      variant="standard"
                      required
                    />
                  </Box>
                  <Box className={"full-width-form-control"}>
                    <FormControl>
                      <Field
                        component={RadioGroup}
                        row
                        name="transaction_variant"
                      >
                        <FormControlLabel
                          value="income"
                          control={<Radio />}
                          label="Приход"
                        />
                        <FormControlLabel
                          value="expense"
                          control={<Radio />}
                          label="Расход"
                        />
                      </Field>
                    </FormControl>
                  </Box>

                  <Box className={"full-width-form-control"}>
                    <Field
                      component={TextField}
                      name="description"
                      label="Описание транзакции"
                      variant="standard"
                      rows={3}
                      multiline
                    />
                  </Box>

                  <Box className="full-width-form-control">
                    <Field
                      component={TextField}
                      type="text"
                      name="transaction_type"
                      label="Тип транзакции"
                      select
                      variant="standard"
                    >
                      {Object.values(TransactionTypeEnum).map(
                        (transactionType) => (
                          <MenuItem
                            key={transactionType}
                            value={transactionType}
                          >
                            {transactionTypeDictionary[transactionType]}
                          </MenuItem>
                        )
                      )}
                    </Field>
                  </Box>

                  <LoadingButton
                    className="TransactionsWindow__creation-form-submit-btn"
                    loading={isSubmitting}
                    loadingPosition="end"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || !isValid}
                  >
                    Добавить транзакцию
                  </LoadingButton>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
