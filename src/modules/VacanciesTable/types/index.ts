import { Vacancy } from "~/generated/graphql";
import { CSSProperties, ReactNode } from "react";

export interface Column {
  id: keyof Vacancy;
  label: JSX.Element | string;
  style?: CSSProperties;
  align?: "right" | "center";
  format?: (_value: string) => string;
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
}
