import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {CertificatesDataClient} from "src/stores/certificates/certificates.dataClient";
import {CertificatesRepository} from "src/stores/certificates/certificates.repository";
import {CertificatesDataService} from "../../stores/certificates/certificates.dataService";

export class CertificatesContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.CertificatesDataClient).to(CertificatesDataClient);
    this.bind(TYPES.CertificatesDataService).to(CertificatesDataService);
    this.bind(TYPES.CertificatesRepository).to(CertificatesRepository);
  }
}
