import {inject, injectable} from "inversify";
import {action, makeObservable, observable} from "mobx";
import {Certificate} from "src/types/shared.types";
import {TYPES} from "src/app/app.types";
import {CertificatesDataClient} from "src/stores/certificates/certificates.dataClient";
import moment from "moment";
import {prop, sortBy} from "ramda";
import {commonErrorText} from "src/constants/notifications";
import {INotificationService} from "src/services/types/notification.interface";

@injectable()
export class CertificatesRepository {
  @observable
  certificates: Certificate[] = [];

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
      const certificates = await this.dataClient.loadCertificates();
      this.certificates = this.getSortedCertificates(
        certificates.map((c) => ({
          ...c,
          created_at: moment(c.created_at, "DD-MM-YYYY").toDate()
        }))
      );
    } catch (e) {
      this.showErrorNotification(e);
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
    this.notificationService.addNotification({
      kind: "error",
      title: "Произошла ошибка",
      message: e?.response?.data?.msg || commonErrorText
    });
  }
}
