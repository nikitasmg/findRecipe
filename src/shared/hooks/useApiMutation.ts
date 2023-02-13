import request, { Variables } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";

export const useApiMutation = <
  Data = unknown,
  Error = unknown,
  CurrentVariables extends Variables = Variables,
  Context = unknown
>(
  query: string
) => {
  const token = useAuthStore((state) => state.token);

  const mutation = useMutation<Data, Error, CurrentVariables, Context>({
    mutationFn: async (variables?: CurrentVariables): Promise<Data> =>
      request(process.env.REACT_APP_API_URL ?? "", query, variables),
    meta: { headers: { ...(Boolean(token) && { Authorization: `Bearer ${token}` }) } }
  });

  return mutation;
};
