import request, { Variables } from "graphql-request";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "~shared/stores/auth";
import { useAlertsStore } from "~shared/stores/alerts";

export const useApi = (
  queryKey: QueryKey,
  requestParams: {
    query: string;
    variables?: Variables;
  }
) => {
  const addAlert = useAlertsStore((state) => state.addAlert);

  const query = useQuery({
    queryKey,
    queryFn: async () =>
      request(process.env.REACT_APP_API_URL ?? "", requestParams.query, requestParams.variables, {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }).catch((errors) => {
        errors?.response?.errors?.forEach(({ message }: { message: string }) =>
          addAlert("error", message)
        );

        return errors;
      }),
    meta: { headers: { Authorization: `Bearer ${useAuthStore.getState().token}` } }
  });
  return query;
};
