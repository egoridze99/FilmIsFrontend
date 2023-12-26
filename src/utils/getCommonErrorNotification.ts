import {commonErrorText} from "src/constants/notifications";
import {NotificationType} from "src/services/types/notification.interface";

export const getCommonErrorNotification = (e: any) => {
  return {
    kind: "error",
    title: "Произошла ошибка",
    message: e?.response?.data?.msg || commonErrorText
  } as NotificationType;
};
