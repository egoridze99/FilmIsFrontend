import React from "react";

export const useSearchPanel = <T extends object>(
  searchPanelDefaultValues: T
) => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = React.useState(false);
  const [searchValues, setSearchValues] = React.useState<T>(
    searchPanelDefaultValues
  );

  const activeSearchItems = React.useMemo(() => {
    return Object.entries(searchValues).reduce((sum, [field, value]) => {
      if (Array.isArray(value)) {
        if (value.length) {
          return sum + 1;
        }
      } else if (Boolean(value)) {
        return sum + 1;
      }

      return sum;
    }, 0);
  }, [searchValues]);

  const clearSearchValues = () => {
    setSearchValues(searchPanelDefaultValues);
  };

  return {
    isSearchPanelOpen,
    setIsSearchPanelOpen,
    searchValues,
    setSearchValues,
    clearSearchValues,
    activeSearchItems
  };
};
