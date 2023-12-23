import React from "react";
import {ReservationSearchBodyType} from "src/types/schedule/schedule.dataClient.types";
import {searchPanelDefaultValues} from "src/UI/pages/workspace/schedule/constants/searchPanelDefaultValues";

export const useSearchPanel = () => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = React.useState(false);
  const [searchValues, setSearchValues] =
    React.useState<ReservationSearchBodyType>(searchPanelDefaultValues);

  const clearSearchValues = () => {
    setSearchValues(searchPanelDefaultValues);
  };

  return {
    isSearchPanelOpen,
    setIsSearchPanelOpen,
    searchValues,
    setSearchValues,
    clearSearchValues
  };
};
