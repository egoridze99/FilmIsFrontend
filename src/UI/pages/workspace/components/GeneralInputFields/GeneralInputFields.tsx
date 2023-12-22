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
    placeholder: "Время в формате HH:MM",
    required: true
  },
  [GeneralFields.duration]: {
    label: "Продолжительность",
    placeholder: "Продолжительность",
    required: true
  },
  [GeneralFields.count]: {
    label: "Кол-во гостей",
    placeholder: "Кол-во гостей",
    required: true
  },
  [GeneralFields["guest.name"]]: {
    label: "Имя гостя",
    placeholder: "Имя гостя",
    required: true
  },
  [GeneralFields["guest.tel"]]: {
    label: "Номер телефона гостя",
    placeholder: "Номер телефона гостя",
    required: true
  },
  [GeneralFields.film]: {
    label: "Фильм",
    placeholder: "Фильм"
  },
  [GeneralFields.note]: {
    label: "Примечание",
    placeholder: "Примечание",
    multiline: true,
    rows: 3
  }
} as Record<
  GeneralFields,
  {
    multiline?: boolean;
    label: string;
    placeholder: string;
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
            placeholder={generalInputFields[field].placeholder}
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
