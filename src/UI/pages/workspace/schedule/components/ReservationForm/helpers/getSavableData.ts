import {FormikInitialValuesType} from "src/UI/pages/workspace/schedule/components/ReservationForm/ReservationForm.types";
import {
  ReservationCreationBodyType,
  ReservationEditBodyType
} from "src/types/schedule/schedule.dataClient.types";
import moment from "moment";
import {DATE_FORMAT} from "src/constants/date";
import {Certificate} from "src/types/shared.types";

export const getSavableData = (
  data: FormikInitialValuesType,
  isEditMode: boolean,
  certificate?: Certificate
): ReservationCreationBodyType => {
  let savableData = {
    ...data,
    date: moment(data.date).format(DATE_FORMAT),
    duration: parseFloat(data.duration as any),
    count: parseInt(data.count as any),
    rent: parseFloat(data.rent as any),
    certificate_ident: certificate?.ident || null
  } as unknown as ReservationCreationBodyType;

  if (isEditMode) {
    savableData = {
      ...savableData,
      cash: parseInt((data.cash as any) || "0"),
      card: parseInt((data.card as any) || "0"),
      note: data.note,
      status: data.status,
      checkouts:
        data.checkouts?.map((c) => ({
          ...c,
          sum: parseInt((c.sum as any) || "0")
        })) || []
    } as ReservationEditBodyType;
  }

  return savableData;
};
