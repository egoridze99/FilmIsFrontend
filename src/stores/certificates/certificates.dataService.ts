import {inject, injectable} from "inversify";
import {TYPES} from "src/app/app.types";
import {CertificatesDataClient} from "./certificates.dataClient";
import {
  CertificateCreationBodyType,
  CertificateSearchBodyType
} from "src/types/certificates/certificates.dataClient.types";
import {CustomerService} from "src/services/customer.service";
import {certificateAdapter} from "src/stores/certificates/helpers/certificateAdapter";
import {Customer} from "src/models/customers/customer.model";

@injectable()
export class CertificatesDataService {
  @inject(TYPES.CertificatesDataClient)
  private readonly dataClient: CertificatesDataClient;

  @inject(TYPES.CustomerService)
  private readonly customerService: CustomerService;

  async loadCertificates() {
    const certificates = await this.dataClient.loadCertificates();

    const customersIds = certificates.map((r) => r.contact_id);
    const customers = await this.customerService.getCustomersById(
      customersIds,
      "dict"
    );

    return certificates.map((c) =>
      certificateAdapter(c, customers[c.contact_id])
    );
  }

  async searchCertificates(data: CertificateSearchBodyType) {
    const certificates = await this.dataClient.searchCertificates(data);

    const customersIds = certificates.map((r) => r.contact_id);
    const customers = await this.customerService.getCustomersById(
      customersIds,
      "dict"
    );

    return certificates.map((c) =>
      certificateAdapter(c, customers[c.contact_id])
    );
  }

  async createCertificate(data: CertificateCreationBodyType) {
    const certificate = await this.dataClient.createCertificate(data);

    const customer = await this.customerService.getCustomersById(
      certificate.contact_id
    );

    return certificateAdapter(certificate, customer as Customer);
  }
}
