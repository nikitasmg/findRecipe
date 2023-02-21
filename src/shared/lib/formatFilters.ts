import { FilterByClause } from "~/generated/graphql";

type Filters = Record<string, string>;

export const formatFilters = (filters: Filters): FilterByClause[] => {
  return Object.entries(filters).reduce((res: FilterByClause[], [key, value]) => {
    if (value) {
      res.push({ column: key, value });
    }

    return res;
  }, []);
};
