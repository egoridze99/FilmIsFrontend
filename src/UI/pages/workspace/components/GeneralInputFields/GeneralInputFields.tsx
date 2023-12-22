import React from "react";
import {Field} from "formik";
import {TextField} from "formik-mui";
import {Box} from "@mui/material";

enum GeneralFields {
  time = "time",
  duration = "duration",
  count = "count",
  "guest.name" = "guest.name",
  "guest.tel" = "guest.tel",
  film = "film",
  note = "note"
}

const generalInputFields = {
  [GeneralFields.time]: {
    label: "Время",
    required: true
  },
  [GeneralFields.duration]: {
    label: "Продолжительность",
    required: true
  },
  [GeneralFields.count]: {
    label: "Кол-во гостей",
    required: true
  },
  [GeneralFields["guest.name"]]: {
    label: "Имя гостя",
    required: true
  },
  [GeneralFields["guest.tel"]]: {
    label: "Номер телефона гостя",
    required: true
  },
  [GeneralFields.film]: {
    label: "Фильм"
  },
  [GeneralFields.note]: {
    label: "Примечание",
    multiline: true,
    rows: 3
  }
} as Record<
  GeneralFields,
  {
    multiline?: boolean;
    label?: string;
    rows?: number;
    required?: boolean;
  }
>;

type GeneralInputFieldsProps = {
  fieldsToRender: GeneralFields[];
};

const GeneralInputFields: React.FC<GeneralInputFieldsProps> = ({
  fieldsToRender
}) => {
  return (
    <>
      {fieldsToRender.map((field) => (
        <Box className="full-width-form-control" marginY={1}>
          <Field
            component={TextField}
            multiline={generalInputFields[field].multiline}
            name={field}
            label={generalInputFields[field].label}
            variant="standard"
            rows={generalInputFields[field].rows}
            required={generalInputFields[field].required}
          />
        </Box>
      ))}
    </>
  );
};

export default GeneralInputFields;
