import { Purchase } from "~/generated/graphql";
import { CSSProperties, ReactNode } from "react";

export interface Column {
  id: keyof Purchase;
  label: JSX.Element | string;
  style?: CSSProperties;
  align?: "right" | "center";
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
  format?: (_value: string) => string;
}
