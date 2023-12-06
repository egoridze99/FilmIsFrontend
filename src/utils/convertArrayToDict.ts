export const convertArrayToDict = <T extends object>(
  collection: Array<T>,
  key: keyof T
): Record<string, T> => {
  return collection.reduce(
    (acc, i) => {
      acc[i[key] as string] = i;
      return acc;
    },
    {} as Record<string, T>
  );
};
