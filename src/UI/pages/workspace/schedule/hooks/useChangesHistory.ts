import React from "react";

export const useChangesHistory = () => {
  const [isChangesModalOpen, setIsChangesModalOpen] = React.useState(false);
  const [changesHistory, setChangesHistory] = React.useState<
    {
      author: string;
      created_at: string;
      id: number;
      data: {[key: string]: any};
    }[]
  >([]);

  const openChangesModal = (
    changes: {
      author: string;
      created_at: string;
      id: number;
      data: {[key: string]: any};
    }[]
  ) => {
    setChangesHistory(changes);
    setIsChangesModalOpen(true);
  };

  const closeChangesModal = () => {
    setChangesHistory([]);
    setIsChangesModalOpen(false);
  };

  return {
    isChangesModalOpen,
    changesHistory,
    openChangesModal,
    closeChangesModal
  };
};
