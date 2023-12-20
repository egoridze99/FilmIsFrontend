import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import classnames from "classnames";

import "./notification.scss";

type NotificationProps = {
  kind?: "info" | "error" | "warn" | "success";
  content?: React.ReactNode;
  title: React.ReactNode;
  removeNotification?: () => void;
};

export const Notification: React.FC<NotificationProps> = ({
  content,
  kind = "info",
  title,
  removeNotification
}) => {
  return (
    <div
      className={classnames("Notification", {
        Notification_success: kind === "success",
        Notification_error: kind === "error",
        Notification_warning: kind === "warn",
        Notification_info: kind === "info"
      })}
    >
      <div className="Notification__header">
        <h1 className="Notification__title">{title}</h1>
        <div className="Notification__header-controls">
          {removeNotification && (
            <div
              className="Notification__close-button"
              onClick={removeNotification}
            >
              <CloseIcon className="Notification__close-button-icon" />
            </div>
          )}
        </div>
      </div>
      <div className="Notification__body">{content}</div>
    </div>
  );
};
