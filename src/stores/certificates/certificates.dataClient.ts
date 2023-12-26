import {injectable} from "inversify";
import {axios} from "src/axios";
import {Certificate} from "src/types/shared.types";

@injectable()
export class CertificatesDataClient {
  async loadCertificates() {
    const response = await axios.get<Certificate[]>("/certificate");

    return response.data;
  }
}
