import {injectable} from "inversify";
import {axios} from "src/axios";
import {Certificate} from "src/types/shared.types";
import {
  CertificateCreationBodyType,
  CertificateSearchBodyType
} from "src/types/certificates/certificates.dataClient.types";

@injectable()
export class CertificatesDataClient {
  async loadCertificates() {
    const response = await axios.get<Certificate[]>("/certificate");

    return response.data;
  }

  async searchCertificates(data: CertificateSearchBodyType) {
    let url = `/certificate/search?`;

    if (data.ids && data.ids.length) {
      url += `ids=${JSON.stringify(data.ids)}&`;
    }

    if (data.telephones && data.telephones.length) {
      url += `telephones=${JSON.stringify(data.telephones)}`;
    }

    const response = await axios.get<Certificate[]>(url);
    return response.data;
  }

  async createCertificate(data: CertificateCreationBodyType) {
    const response = await axios.post<Certificate>("/certificate", data);

    return response.data;
  }
}
