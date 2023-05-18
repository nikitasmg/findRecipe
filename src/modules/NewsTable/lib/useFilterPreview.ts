import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNewsCategoriesQuery, useNewsTagsQuery } from "~/generated/graphql";

enum FilterNames {
  id = "ID",
  category = "Category"
}

export const useFilterPreview = <T = Record<string, unknown>>(params: T) => {
  const filters: { id: string; title: string; value: string }[] = [];

  const client = useGraphqlClient();

  const { data: categories } = useNewsCategoriesQuery(client, {}, { refetchOnMount: "always" });
  const { data: tags } = useNewsTagsQuery(client, {}, { refetchOnMount: "always" });

  console.log(params);

  return filters;
};
