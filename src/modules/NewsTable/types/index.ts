import { NewsPaginator } from "~/generated/graphql";
import { CSSProperties, ReactNode } from "react";

export interface Column {
  id: keyof NewsPaginator["data"][0];
  label: JSX.Element | string;
  style?: CSSProperties;
  align?: "right" | "center";
  format?: (_value: string) => string;
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
  className?: string;
}
