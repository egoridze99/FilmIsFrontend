export const isJSON = (x: unknown): x is string => {
  try {
    JSON.parse(x as string);
    return true;
  } catch (parseException) {
    return false;
  }
};
