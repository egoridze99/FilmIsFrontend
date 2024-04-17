import {Certificate, DateTimeType} from "../shared.types";
import {Customer} from "src/types/customer.types";

export type CertificateResponseType = Omit<Certificate, "created_at"> & {
  created_at: DateTimeType;
};

export type CertificateCreationBodyType = {
  card: number;
  cash: number;
  cinema_id: number;
  contact: Customer;
  note: string | null;
  service: string;
  sum: number;
};

export type CertificateSearchBodyType = {
  ids?: string | null;
  telephones?: string | null;
};
