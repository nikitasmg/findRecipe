export const getDeepValue = <T = Record<string, unknown> | null, R = unknown>(
  key: string,
  object?: T
): R | null | Record<string, unknown> => {
  if (!object) {
    return null;
  }

  if (!key) {
    return object;
  }

  const currentKey = key.split(".")[0];

  return getDeepValue(
    key.replace(currentKey, "").replace(/^\./, ""),
    object[currentKey as keyof typeof object]
  );
};
