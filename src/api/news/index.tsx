import { useApiMutation } from "~shared/hooks/useApiMutation";
import { NewsPaginator, OrderByClause, FilterByClause } from "~generated";
import { News } from "./queries";

type FetchNewsArgs = {
  page: number;
  orderBy?: OrderByClause[];
  filter?: FilterByClause[];
  first?: number;
};

export const useFetchNews = () => {
  return useApiMutation<{ news: NewsPaginator }, unknown, FetchNewsArgs | never>(News);
};
