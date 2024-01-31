import React from "react";
import {Moment} from "moment";

type ChangesHistoryType = {
  author: string;
  created_at: Moment;
  id: number;
  data: {[key: string]: any};
}[];

export const useChangesHistory = (
  loadChangesHistory: (reservationId: number) => Promise<ChangesHistoryType>
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isChangesModalOpen, setIsChangesModalOpen] = React.useState(false);
  const [changesHistory, setChangesHistory] =
    React.useState<ChangesHistoryType>([]);

  const _isOpen = React.useRef<boolean>(false);

  const onLoadChangesHistory = async (reservationId: number) => {
    setIsLoading(true);
    setIsChangesModalOpen(true);
    _isOpen.current = true;

    const changesHistory = await loadChangesHistory(reservationId);

    if (_isOpen.current) {
      setChangesHistory(changesHistory);
    }

    setIsLoading(false);
  };

  const closeChangesModal = () => {
    setChangesHistory([]);
    setIsChangesModalOpen(false);
    setIsLoading(false);
    _isOpen.current = false;
  };

  return {
    isChangesLoading: isLoading,
    isChangesModalOpen,
    changesHistory,
    loadChangesHistory: onLoadChangesHistory,
    closeChangesModal
  };
};
