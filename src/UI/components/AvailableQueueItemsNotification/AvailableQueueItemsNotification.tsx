import React from "react";

import "./availableQueueItemsNotification.scss";

export type AvailableQueueItemsNotificationProps = {
  queueItemsIds: number[];
  redirectToQueueTab(ids: number[]): void;
};

const AvailableQueueItemsNotification: React.FC<
  AvailableQueueItemsNotificationProps
> = ({queueItemsIds, redirectToQueueTab}) => {
  return (
    <div className="AvailableQueueItemsNotification">
      <p className="AvailableQueueItemsNotification__text">
        Данные успешно сохранены
      </p>
      <p className="AvailableQueueItemsNotification__text">
        В очереди есть доступные элементы с id:
      </p>
      <ul className="AvailableQueueItemsNotification__list">
        {queueItemsIds.map((id) => (
          <li className="AvailableQueueItemsNotification__list-item">{id}</li>
        ))}
      </ul>

      <p
        className="AvailableQueueItemsNotification__link"
        onClick={() => redirectToQueueTab(queueItemsIds)}
      >
        Открыть на вкладке "Очередь"
      </p>
    </div>
  );
};

export default AvailableQueueItemsNotification;
