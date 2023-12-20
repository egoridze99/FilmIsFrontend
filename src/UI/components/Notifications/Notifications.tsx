import React from "react";
import {observer} from "mobx-react-lite";
import {NotificationType} from "src/services/types/notification.interface";
import {Notification} from "./Notification";

import "./notifications.scss";

type NotificationsProps = {
  notifications: NotificationType[];
  clearNotifications: () => void;
  removeNotification: (n: NotificationType) => void;
};

const Notifications: React.FC<NotificationsProps> = observer(
  ({notifications, clearNotifications, removeNotification}) => {
    return (
      <div className="Notifications">
        {notifications.map((notification) => {
          return (
            <div
              className="Notifications__notification-container"
              key={notification.id}
            >
              <Notification
                removeNotification={() => removeNotification(notification)}
                title={notification.title || "Уведомление"}
                content={notification.message}
                kind={notification.kind}
              />
            </div>
          );
        })}
        {notifications.length > 0 && (
          <div
            className="Notifications__clear-button-container"
            onClick={clearNotifications}
          >
            <div className="Notifications__clear-button-text">
              Скрыть все уведомления
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default React.memo(Notifications);
