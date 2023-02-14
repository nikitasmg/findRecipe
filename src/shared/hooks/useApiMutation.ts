import request, { Variables } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "~shared/stores/auth";
import { useAlertsStore } from "~shared/stores/alerts";

export const useApiMutation = <
  Data = unknown,
  Error = unknown,
  CurrentVariables = Variables,
  Context = unknown
>(
  query: string
) => {
  const token = useAuthStore((state) => state.token);

  const addAlert = useAlertsStore((state) => state.addAlert);

  const mutation = useMutation<Data, Error, CurrentVariables, Context>({
    mutationFn: async (variables: CurrentVariables = {} as CurrentVariables): Promise<Data> =>
      request(process.env.REACT_APP_API_URL ?? "", query, variables as Variables).catch(
        (errors) => {
          errors?.response?.errors?.forEach(({ message }: { message: string }) =>
            addAlert("error", message)
          );

          return errors;
        }
      ),
    meta: { headers: { ...(Boolean(token) && { Authorization: `Bearer ${token}` }) } }
  });

  return mutation;
};
