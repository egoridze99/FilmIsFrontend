import {inject, injectable} from "inversify";
import {TYPES} from "../../app/app.types";
import {CertificatesDataClient} from "./certificates.dataClient";
import {
  CertificateCreationBodyType,
  CertificateResponseType,
  CertificateSearchBodyType
} from "../../types/certificates/certificates.dataClient.types";
import {Certificate} from "../../types/shared.types";
import moment from "moment";

@injectable()
export class CertificatesDataService {
  @inject(TYPES.CertificatesDataClient)
  private readonly dataClient: CertificatesDataClient;

  async loadCertificates() {
    const certificates = await this.dataClient.loadCertificates();

    return certificates.map(this.getCertificateWithMomentCreatedAt);
  }

  async searchCertificates(data: CertificateSearchBodyType) {
    const certificates = await this.dataClient.searchCertificates(data);

    return certificates.map(this.getCertificateWithMomentCreatedAt);
  }

  async createCertificate(data: CertificateCreationBodyType) {
    const certificate = await this.dataClient.createCertificate(data);

    return this.getCertificateWithMomentCreatedAt(certificate);
  }

  private getCertificateWithMomentCreatedAt(
    certificate: CertificateResponseType
  ): Certificate {
    return {...certificate, created_at: moment.utc(certificate.created_at)};
  }
}
