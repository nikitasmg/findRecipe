import { NewsPaginator, SortOrder } from "~/api/generated/graphql";

export interface Column {
  id: keyof NewsPaginator["data"][0];
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right";
  format?: (_value: string) => string;
}

export type ActiveOrder = { name: string; direction: SortOrder } | null;
