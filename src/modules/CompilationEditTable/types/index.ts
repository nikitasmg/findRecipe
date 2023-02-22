import { ReactNode } from "react";
import { CompilationItem } from "~shared/types/Compilation";

export interface Column {
  id: keyof CompilationItem;
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (_value: string | number) => string;
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
}
