import {Certificate, DateTimeType} from "../shared.types";
import {Customer} from "src/types/customer.types";
import {TransactionCreationType} from "src/types/transactions/transactions.types";

export type CertificateResponseType = Omit<Certificate, "created_at"> & {
  created_at: DateTimeType;
};

export type CertificateCreationBodyType = {
  cinema_id: number;
  contact: Customer;
  note: string | null;
  service: string;
  sum: number;
  transactions: Omit<TransactionCreationType, "description">[];
};

export type CertificateSearchBodyType = {
  ids?: string | null;
  telephones?: string | null;
};
