export const getTarget = <Target = unknown, T extends { target: Target } = { target: Target }>(
  event: T
): Target => event.target;

export const getTargetValue = <
  Value extends string = string,
  Target extends { value: Value } = { value: Value },
  T extends { target: Target } = { target: Target }
>(
  event: T
) => getTarget<Target, T>(event).value;

export const getEventValueHandler =
  <
    Value extends string = string,
    Target extends { value: Value } = { value: Value },
    T extends { target: Target } = { target: Target }
  >(
    callback: (_value: Value) => void
  ) =>
  (event: T) =>
    callback(getTargetValue<Value, Target, T>(event));
