import React from "react";

type Action = {
  type: "open" | "close";
};

export const useReservationFormProps = (closeSettings: () => void) => {
  const [isReservationFormOpened, toggleReservationForm] = React.useReducer(
    (prev, action: Action) => {
      if (action.type === "open") {
        closeSettings();
        return true;
      } else {
        return false;
      }
    },
    false
  );

  const openReservationForm = () => {
    toggleReservationForm({type: "open"});
  };

  const closeReservationForm = () => {
    toggleReservationForm({type: "close"});
  };

  return {
    isReservationFormOpened,
    openReservationForm,
    closeReservationForm
  };
};
