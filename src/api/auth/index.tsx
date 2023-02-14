import { useApiMutation } from "~shared/hooks/useApiMutation";
import { Mutation, MutationLoginArgs } from "~/api/generated/graphql";
import { Login, Logout } from "./queries";

export const useFetchLogin = () => {
  return useApiMutation<{ login: Mutation["login"] }, unknown, MutationLoginArgs>(Login);
};

export const useFetchLogout = () => {
  return useApiMutation(Logout);
};
