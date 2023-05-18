type AnyArgs = unknown[];
type AnyCallback<Args extends AnyArgs = AnyArgs> = (..._args: Args) => void;

export const debounce = <
  Args extends AnyArgs = AnyArgs,
  T extends AnyCallback<Args> = AnyCallback<Args>
>(
  cb: T,
  wait = 20
) => {
  let h: NodeJS.Timeout | number = 0;
  const callable = (...args: Args) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>callable;
};
