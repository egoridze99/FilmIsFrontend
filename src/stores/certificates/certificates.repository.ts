import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {Certificate} from "src/types/shared.types";
import {TYPES} from "src/app/app.types";
import {CertificatesDataClient} from "src/stores/certificates/certificates.dataClient";
import moment from "moment";
import {prop, sortBy} from "ramda";
import {commonErrorText} from "src/constants/notifications";
import {INotificationService} from "src/services/types/notification.interface";
import {
  CertificateCreationBodyType,
  CertificateSearchBodyType
} from "src/types/certificates/certificates.dataClient.types";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";

@injectable()
export class CertificatesRepository {
  @observable
  certificates: Certificate[] = [];

  @observable
  isLoading: boolean = false;

  @inject(TYPES.CertificatesDataClient)
  private readonly dataClient: CertificatesDataClient;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  constructor() {
    makeObservable(this);
  }

  @action
  async loadData() {
    try {
      this.isLoading = true;
      const certificates = await this.dataClient.loadCertificates();
      this.certificates = this.getSortedCertificates(
        certificates.map((c) => ({
          ...c,
          created_at: moment(c.created_at, "DD-MM-YYYY").toDate()
        }))
      );
    } catch (e) {
      this.showErrorNotification(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async searchCertificates(data: CertificateSearchBodyType) {
    try {
      this.isLoading = true;
      const certificates = await this.dataClient.searchCertificates(data);
      this.certificates = this.getSortedCertificates(
        certificates.map((c) => ({
          ...c,
          created_at: moment(c.created_at, "DD-MM-YYYY").toDate()
        }))
      );
      return true;
    } catch (e) {
      this.showErrorNotification(e);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async createCertificate(data: CertificateCreationBodyType) {
    try {
      return this.dataClient.createCertificate(data);
    } catch (e) {
      this.showErrorNotification(e);
      return null;
    }
  }

  @action
  reset() {
    this.certificates = [];
  }

  private getSortedCertificates(data: Certificate[]) {
    return sortBy(prop("created_at"), data).reverse();
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }
}
