import { gql } from "graphql-request";
import { useApiMutation } from "~/shared/hooks/useApiMutation";
import { getDefaultSuccessUpdate } from "~/shared/lib/messages";
import { useCallback } from "react";


type Input = {
  mutationName: string;
  groupId: number;
  items: { id: number | string; sort?: number | null }[];
};

export const useResortDocumentsInGroup = () => {
  const { mutateAsync, ...other } = useApiMutation();

  const fetch = useCallback(
    (variables: {groupId: Input["groupId"], items: Input["items"]}) => {
        const str = JSON.stringify(variables.items).replace(/"/g, "");
        
      const mutation = gql`mutation resort {
    ${
        gql`upsertDocumentGroup(input: { id: ${variables.groupId}, linked_documents: { syncWithoutDetaching: ${str} } }) {
          id
        }}\n`
  }`;
  
  console.log(mutation);

      mutateAsync({ customQuery: mutation }, { onSuccess: getDefaultSuccessUpdate });
    },
    [mutateAsync]
  );

  return { mutateAsync: fetch, ...other };
};
