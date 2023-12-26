import {CertificateCreationBodyType} from "src/types/certificates/certificates.dataClient.types";
import {Nullable} from "src/types/core.types";

export const initialValues: Nullable<CertificateCreationBodyType> = {
  card: 0,
  cash: 0,
  cinema_id: null,
  contact: null,
  note: null,
  service: null,
  sum: null,
  telephone: null
};
