import React, { FC, PropsWithChildren } from "react";

type ContextOptions = {
  name?: string;
};

export function createCallableCtx<R>(
  value: () => R,
  { name }: ContextOptions
): readonly [() => R, FC<PropsWithChildren>] {
  const Ctx = React.createContext<R>({} as R);

  const useContext = () => {
    const context = React.useContext(Ctx);

    if (context === undefined) throw new Error("useContext must be inside a Provider with a value");

    return context;
  };

  const Provider: FC<PropsWithChildren> = ({ children }) => {
    return <Ctx.Provider value={value()}>{children}</Ctx.Provider>;
  };

  if (name) {
    Provider.displayName = name;
  }

  return [useContext, Provider] as const;
}

export function createCtx<T>(
  value: T,
  { name }: ContextOptions
): readonly [() => T, FC<PropsWithChildren>] {
  const Ctx = React.createContext<T>({} as T);

  const useContext = () => {
    const context = React.useContext(Ctx);

    if (context === undefined) throw new Error("useContext must be inside a Provider with a value");

    return context;
  };

  const Provider: FC<PropsWithChildren> = ({ children }) => {
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  };

  if (name) {
    Provider.displayName = name;
  }

  return [useContext, Provider] as const;
}
