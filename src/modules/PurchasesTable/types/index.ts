import { Purchase } from "~/generated/graphql";
import { ReactNode } from "react";

export interface Column {
  id: keyof Purchase;
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right" | "center";
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
  format?: (_value: string) => string;
}
