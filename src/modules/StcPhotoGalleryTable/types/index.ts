import { CSSProperties, ReactNode } from "react";
import { StcPhotoGallery } from "~/generated/graphql";

export interface Column {
  id: keyof StcPhotoGallery;
  label: JSX.Element | string;
  style?: CSSProperties;
  align?: "right" | "center";
  render?: (_value: unknown, row: Record<string, unknown>) => ReactNode;
  format?: (_value: unknown) => string;
}
