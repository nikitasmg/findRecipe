import { compose, curry, prop } from "rambda";

export const getCheckedHandler =
  <T extends Record<string | number, unknown>, Key = string | number, Value = unknown>(
    setValue: (name: Key, value: Value) => void
  ) =>
  (name: keyof T) =>
    compose(curry(setValue)(name), prop("checked"), prop("target"));
