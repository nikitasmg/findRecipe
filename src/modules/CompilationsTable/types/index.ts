import { ReactNode } from "react";
import { Compilations } from "~/shared/stores/compilations";

export interface Column {
  id: keyof Compilations;
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (_value: string | number | Compilations["whereUseLink"]) => string;
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
}
