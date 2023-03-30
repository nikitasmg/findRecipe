import { gql } from "graphql-request";
import { useApiMutation } from "~/shared/hooks/useApiMutation";
import { getDefaultSuccessUpdate } from "~/shared/lib/messages";
import { useCallback } from "react";

type Input = {
  items: number[];
};

export const useHideNews = () => {
  const { mutateAsync, ...other } = useApiMutation();

  const fetch = useCallback(
    (variables: Input["items"]) => {
      const mutation = gql`mutation deleteAllNews {
    ${variables.reduce((res: string, cur, i) => {
      return res.concat(
        gql`item${i}: upsertNews(input: {id: ${cur}, published: false}) {
          id
        }\n`
      );
    }, "")}
  }`;

      return mutateAsync({ customQuery: mutation }, { onSuccess: getDefaultSuccessUpdate });
    },
    [mutateAsync]
  );

  return { mutateAsync: fetch, ...other };
};
