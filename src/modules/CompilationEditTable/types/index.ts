import React, { ReactNode } from "react";
import { CompilationItem } from "~shared/types/Compilation";

export interface Column {
  id: keyof CompilationItem;
  label: JSX.Element | string;
  style: React.CSSProperties;
  align?: "right" | "center";
  format?: (_value: string | number) => string;
  render?: (
    _value: unknown,
    row: Record<string, unknown>,
    editOptions?: { handleChange: React.ChangeEventHandler<HTMLInputElement> }
  ) => ReactNode;
}
