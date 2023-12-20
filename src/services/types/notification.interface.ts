import React from "react";

export type NotificationKind = "info" | "error" | "warn" | "success";

export type NotificationType = {
  id?: string;
  kind?: NotificationKind;
  message?: React.ReactNode;
  title?: React.ReactNode;
  timeout?: number | null;
};

export interface INotificationService {
  notifications: NotificationType[];
  clearNotifications: () => void;

  /**
   * Добавить уведомление
   * @param notification уведомление
   */
  addNotification(notification: NotificationType): NotificationType;

  /**
   * Удалить уведомление
   * @param notification уведомление
   */
  removeNotification(notification: NotificationType): void;
}
