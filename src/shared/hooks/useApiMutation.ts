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
  query?: string
) => {
  const addAlert = useAlertsStore((state) => state.addAlert);

  const mutation = useMutation<Data, Error, CurrentVariables, Context>({
    mutationFn: async (
      variables = { customQuery: "" } as CurrentVariables & { customQuery?: string }
    ): Promise<Data> =>
      request(
        process.env.REACT_APP_API_URL ?? "",
        query ?? (variables as CurrentVariables & { customQuery?: string }).customQuery ?? "",
        { ...variables, customQuery: undefined } as Variables,
        { Authorization: `Bearer ${useAuthStore.getState().token}` }
      ).catch((errors) => {
        errors?.response?.errors?.forEach(({ message }: { message: string }) =>
          addAlert("error", message)
        );

        return errors;
      }),
    meta: {
      headers: { Authorization: `Bearer ${useAuthStore.getState().token}` }
    }
  });

  return mutation;
};
