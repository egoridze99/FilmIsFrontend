import React from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {Field} from "formik";
import {TextField} from "formik-mui";
import {useDidMountEffect} from "src/hooks/useDidMountEffect";

import "./checkoutsSection.scss";

type Checkout = {note: string | null; sum: string | null};
const defaultCheckoutValues = {note: null, sum: null};

type CheckoutsSectionProps = {
  push(val: Checkout): void;
  checkouts: Checkout[];

  scrollBottom?: () => void;
};

const CheckoutsSection: React.FC<CheckoutsSectionProps> = ({
  push,
  checkouts,
  scrollBottom
}) => {
  useDidMountEffect(() => {
    scrollBottom && scrollBottom();
  }, [checkouts.length]);

  return (
    <div className="CheckoutsSection">
      <div className="CheckoutsSection__header">
        <Typography variant="h5" fontSize={18}>
          Расходы
        </Typography>
        <IconButton
          onClick={() =>
            push({
              ...defaultCheckoutValues
            })
          }
        >
          <Add />
        </IconButton>
      </div>
      {checkouts &&
        Boolean(checkouts.length) &&
        checkouts.map((_, index) => (
          <Box
            key={index}
            marginY={1}
            className="full-width-form-control CheckoutsSection__checkouts"
          >
            <Field
              component={TextField}
              name={`checkouts.${index}.note`}
              label="Заметка"
              placeholder="Заметка"
              variant="standard"
              required
            />

            <Field
              component={TextField}
              name={`checkouts.${index}.sum`}
              label="Сумма"
              placeholder="Сумма"
              variant="standard"
              multiline
              required
            />
          </Box>
        ))}
    </div>
  );
};

export default CheckoutsSection;
