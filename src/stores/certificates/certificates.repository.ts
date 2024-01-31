import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {Certificate} from "src/types/shared.types";
import {TYPES} from "src/app/app.types";
import {Moment} from "moment";
import {compose, prop, sortBy} from "ramda";
import {INotificationService} from "src/services/types/notification.interface";
import {
  CertificateCreationBodyType,
  CertificateSearchBodyType
} from "src/types/certificates/certificates.dataClient.types";
import {getCommonErrorNotification} from "src/utils/getCommonErrorNotification";
import {CertificatesDataService} from "./certificates.dataService";

@injectable()
export class CertificatesRepository {
  @observable
  certificates: Certificate[] = [];

  @observable
  isLoading: boolean = false;

  @inject(TYPES.CertificatesDataService)
  private readonly dataService: CertificatesDataService;

  @inject(TYPES.NotificationService)
  private readonly notificationService: INotificationService;

  constructor() {
    makeObservable(this);
  }

  @action
  async loadData() {
    try {
      this.isLoading = true;
      const certificates = await this.dataService.loadCertificates();

      this.certificates = this.getSortedCertificates(certificates);
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
      const certificates = await this.dataService.searchCertificates(data);
      this.certificates = this.getSortedCertificates(certificates);
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
      return this.dataService.createCertificate(data);
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
    return sortBy(
      compose((item: Moment) => {
        return item.toDate();
      }, prop("created_at")),
      data
    ).reverse();
  }

  private showErrorNotification(e: any) {
    this.notificationService.addNotification(getCommonErrorNotification(e));
  }
}
