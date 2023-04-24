import { CSSProperties, ReactNode } from "react";
import { Video360 } from "~/generated/graphql";



export interface Column {
    id: keyof Video360;
    label: JSX.Element | string;
    style?: CSSProperties;
    align?: "right" | "center";
    render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
    format?: (_value: unknown) => string;
  }
  