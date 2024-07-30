import {CertificateResponseType} from "src/types/certificates/certificates.dataClient.types";
import {Customer} from "src/models/customers/customer.model";
import {omit} from "ramda";
import {Certificate} from "src/types/shared.types";
import moment from "moment/moment";
import {DATETIME_FORMAT} from "src/constants/date";

export const certificateAdapter = (
  certificate: CertificateResponseType,
  contact: Customer
): Certificate => {
  return {
    ...omit(["contact_id"], certificate),
    created_at: moment(certificate.created_at, DATETIME_FORMAT),
    contact
  };
};
