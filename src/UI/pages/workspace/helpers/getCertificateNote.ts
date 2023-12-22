import {Certificate} from "src/types/shared.types";

export const getCertificateNote = (certificate: Certificate) =>
  `Сертификат на услугу: ${certificate.service}; Примечание: ${
    certificate.note || "Пусто"
  };  На сумму: ${certificate.sum}`;
