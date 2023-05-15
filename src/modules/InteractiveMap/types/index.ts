import { MapObject } from "~/generated/graphql";
import { CSSProperties, ReactNode } from "react";

export interface Column {
  id: keyof MapObject;
  label: JSX.Element | string;
  style?: CSSProperties;
  align?: "right" | "center";
  render?: (_value: unknown, row: Partial<MapObject>) => ReactNode;
  className?: string;
}

export const ItemsGroups = {
  "layer-32": 1,
  "layer-33": 2,
  "layer-26": 3,
  "layer-5": 4,
  "layer-18": 5,
  "layer-29": 6,
  "layer-11": 7,
  "layer-25": 8,
  "layer-27": 9,
  "layer-21": 10,
  "layer-28": 11,
  "layer-16": 12,
  "layer-10": 13,
  "layer-8": 14,
  "layer-3": 15,
  "layer-30": 16,
  "layer-6": 17,
  "layer-7": 18,
  "layer-24": 19
};
