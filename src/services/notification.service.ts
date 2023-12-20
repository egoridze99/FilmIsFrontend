import {action, makeObservable, observable} from "mobx";
import {
  INotificationService,
  NotificationType
} from "src/services/types/notification.interface";
import {uid} from "uid";
import {injectable} from "inversify";

@injectable()
export class NotificationService implements INotificationService {
  /**
   * Массив уведомлений
   */
  @observable notifications: NotificationType[] = [];

  constructor() {
    makeObservable(this);
  }

  /**
   * Добавить уведомление
   * @param notification уведомление
   */
  @action addNotification(notification: NotificationType) {
    if (notification.id) {
      const existedNotification = this.notifications.find(
        (n) => n.id === notification.id
      );
      existedNotification && this.removeNotification(existedNotification);
    }

    const notificationId = uid();
    notification = {
      ...notification,
      id: notification.id || notificationId
    };

    if (notification.timeout !== null && notification.kind !== "error") {
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.timeout || 5000);
    }

    let title = notification.title;
    if (!title) {
      switch (notification.kind) {
        case "error":
          title = "Ошибка";
          break;
        case "warn":
          title = "Предупреждение";
          break;
        case "success":
          title = "Успех";
          break;
        default:
          title = "Информация";
      }
    }

    this.notifications.push(notification);
    return notification;
  }

  /**
   * Удалить уведомление
   * @param notification уведомление
   */
  @action removeNotification(notification: NotificationType) {
    const notification_id = notification.id;

    this.notifications = this.notifications.filter(
      ({id}) => id !== notification_id
    );
  }

  /**
   * Очистить уведомления
   */
  @action clearNotifications = () => {
    this.notifications = [];
  };
}
