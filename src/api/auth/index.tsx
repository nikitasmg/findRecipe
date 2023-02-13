import { useApiMutation } from "~shared/hooks/useApiMutation";
import { Mutation, MutationLoginArgs } from "~generated";
import { Login, Logout } from "./queries";

export const useFetchLogin = () => {
  return useApiMutation<{ login: Mutation["login"] }, unknown, MutationLoginArgs>(Login);
};

export const useFetchLogout = () => {
  return useApiMutation(Logout);
};
