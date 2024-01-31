import {injectable} from "inversify";
import {axios} from "src/axios";
import {
  CertificateCreationBodyType,
  CertificateResponseType,
  CertificateSearchBodyType
} from "src/types/certificates/certificates.dataClient.types";

@injectable()
export class CertificatesDataClient {
  async loadCertificates() {
    const response = await axios.get<CertificateResponseType[]>("/certificate");

    return response.data;
  }

  async searchCertificates(data: CertificateSearchBodyType) {
    let url = `/certificate/search?`;

    const ids = data.ids ? data.ids.split(" ") : [];
    if (ids.length) {
      url += `ids=${JSON.stringify(ids)}&`;
    }

    const telephones = data.telephones ? data.telephones.split(" ") : [];
    if (telephones.length) {
      url += `telephones=${JSON.stringify(telephones)}`;
    }

    const response = await axios.get<CertificateResponseType[]>(url);
    return response.data;
  }

  async createCertificate(data: CertificateCreationBodyType) {
    const response = await axios.post<CertificateResponseType>(
      "/certificate",
      data
    );

    return response.data;
  }
}
