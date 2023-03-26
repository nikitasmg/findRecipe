import { gql } from "graphql-request";
import { useApiMutation } from "~/shared/hooks/useApiMutation";
import { getDefaultSuccessUpdate } from "~/shared/lib/messages";

type Input = {
  mutationName: string;
  items: { id: number | string; sort: number }[];
};

export const useResort = (mutationName: Input["mutationName"]) => {
  const { mutateAsync, ...other } = useApiMutation();

  const fetch = (variables: Input["items"]) => {
    const mutation = gql`mutation resort {
    ${variables.reduce((res: string, cur, i) => {
      return res.concat(
        gql`item${i}: ${mutationName}(input: { id: ${cur.id}, sort: ${cur.sort} }) {
          id
        }\n`
      );
    }, "")}
  }`;

    mutateAsync({ customQuery: mutation }, { onSuccess: getDefaultSuccessUpdate });
  };

  return { mutateAsync: fetch, ...other };
};
