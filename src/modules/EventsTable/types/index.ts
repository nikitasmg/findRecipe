import { EventPaginator } from "~/generated/graphql";
import { ReactNode } from "react";

export interface Column {
  id: keyof EventPaginator["data"][0];
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (_value: string) => string;
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
}
