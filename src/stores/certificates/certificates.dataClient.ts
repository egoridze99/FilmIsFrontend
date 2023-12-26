import {injectable} from "inversify";
import {axios} from "src/axios";
import {Certificate} from "src/types/shared.types";
import {CertificateCreationBodyType} from "src/types/certificates/certificates.dataClient.types";

@injectable()
export class CertificatesDataClient {
  async loadCertificates() {
    const response = await axios.get<Certificate[]>("/certificate");

    return response.data;
  }

  async createCertificate(data: CertificateCreationBodyType) {
    const response = await axios.post<Certificate>("/certificate", data);

    return response.data;
  }
}
