import { UserPaginator } from "~/generated/graphql";
import { CSSProperties, ReactNode } from "react";

export interface Column {
  id: keyof UserPaginator["data"][0];
  label: JSX.Element | string;
  style?: CSSProperties;
  minWidth?: number;
  align?: "right" | "center";
  format?: (_value: string) => string;
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
  className?: string;
}
