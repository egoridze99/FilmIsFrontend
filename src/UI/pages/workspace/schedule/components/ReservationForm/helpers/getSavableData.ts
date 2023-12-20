import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import {ReservationCreationBodyType} from "src/types/schedule/schedule.dataClient.types";
import moment from "moment";
import {DATE_FORMAT} from "src/constants/date";
import {Certificate} from "src/types/shared.types";

export const getSavableData = (
  data: FormikInitialValuesType,
  certificate?: Certificate
): ReservationCreationBodyType => {
  return {
    ...data,
    date: moment(data.date).format(DATE_FORMAT),
    duration: parseFloat(data.duration as any),
    count: parseInt(data.count as any),
    rent: parseFloat(data.rent as any),
    certificate_ident: certificate?.ident || null
  } as unknown as ReservationCreationBodyType;
};
