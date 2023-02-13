import request, { Variables } from "graphql-request";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";

export const useApi = (
  queryKey: QueryKey,
  requestParams: {
    query: string;
    variables?: Variables;
  }
) => {
  const token = useAuthStore((state) => state.token);

  const query = useQuery({
    queryKey,
    queryFn: async () =>
      request(process.env.REACT_APP_API_URL ?? "", requestParams.query, requestParams.variables),
    meta: { headers: { ...(Boolean(token) && { Authorization: `Bearer ${token}` }) } }
  });
  return query;
};
