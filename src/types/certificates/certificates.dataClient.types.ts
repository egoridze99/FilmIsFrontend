import {Certificate, DateTimeType} from "../shared.types";

export type CertificateResponseType = Omit<Certificate, "created_at"> & {
  created_at: DateTimeType;
};

export type CertificateCreationBodyType = {
  card: number;
  cash: number;
  cinema_id: number;
  contact: string;
  note: string | null;
  service: string;
  sum: number;
  telephone: string;
};

export type CertificateSearchBodyType = {
  ids?: string | null;
  telephones?: string | null;
};
