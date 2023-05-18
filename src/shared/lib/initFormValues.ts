import { getDeepValue } from "./getDeepValue";

export type ConfigItem =
  | string
  | [
      string,
      {
        key?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        format?: (value: any) => unknown;
      }
    ];

export const prepareInitialValues = <T = Record<string, unknown> | null>(
  config: ConfigItem[],
  values: T
): [string, unknown][] => {
  return config.map((item) => {
    const key = Array.isArray(item) ? item[0] : item;
    let value: unknown;

    if (typeof item === "object" && "key" in item[1] && item[1].key) {
      value = getDeepValue<T, string>(item[1].key, values);
    } else {
      value = values?.[key as keyof typeof values];
    }

    if (Array.isArray(item) && "format" in item[1]) {
      value = item[1].format?.(value);
    }

    return [key, value];
  });
};

export const initFormValues = <T, R>(config: ConfigItem[], setValue: R, values: T) => {
  if (typeof setValue === "function")
    return prepareInitialValues<T>(config, values).forEach((value) => setValue?.(...value));
};
