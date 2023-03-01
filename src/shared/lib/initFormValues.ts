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

    if (typeof item === "string") {
      value = values?.[item as keyof typeof values];
    } else if ("key" in item[1] && item[1].key) {
      value = getDeepValue<T, string>(item[1].key, values);
    }

    if (Array.isArray(item) && "format" in item[1]) {
      value = item[1].format?.(value);
    }

    return [key, value];
  });
};

export const initFormValues = <T = Record<string, unknown> | null>(
  config: ConfigItem[],
  setValue: (name: string, value: unknown) => void,
  values: T
) => {
  return prepareInitialValues<T>(config, values).forEach((value) => setValue(...value));
};
