import React from "react";
import {searchPanelDefaultValues} from "src/UI/pages/certificates/constants/searchPanelDefaultValues";
import {CertificateSearchBodyType} from "src/types/certificates/certificates.dataClient.types";

export const useSearch = () => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = React.useState(false);
  const [searchValues, setSearchValues] =
    React.useState<CertificateSearchBodyType>(searchPanelDefaultValues);

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
