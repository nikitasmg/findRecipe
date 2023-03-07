import { Vacancy } from "~/generated/graphql";
import { ReactNode } from "react";

export interface Column {
  id: keyof Vacancy;
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right" | "center";
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
}
