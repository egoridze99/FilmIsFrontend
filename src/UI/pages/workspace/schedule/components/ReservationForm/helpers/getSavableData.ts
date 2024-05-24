import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType
} from "src/types/schedule/schedule.dataClient.types";
import moment from "moment";
import {DATE_FORMAT} from "src/constants/date";

export const getSavableData = (
  data: FormikInitialValuesType,
  isEditMode: boolean
): ReservationCreationBodyType => {
  let savableData = {
    ...data,
    guest: data.guest?.id,
    date: moment(data.date).format(DATE_FORMAT),
    duration: parseFloat(data.duration as any),
    count: parseInt(data.count as any),
    rent: parseFloat(data.rent as any),
    certificate_ident: data.certificate?.ident || null
  } as unknown as ReservationCreationBodyType;

  if (isEditMode) {
    savableData = {
      ...savableData,
      note: data.note,
      status: data.status
    } as ReservationEditBodyType;
  }

  return savableData;
};
