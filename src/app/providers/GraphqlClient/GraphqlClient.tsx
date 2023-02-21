import { GraphQLClient } from "graphql-request";
import { Response } from "graphql-request/dist/types";
import { compose, curry, prop } from "rambda";
import { createCtx } from "~/shared/lib/context";
import { useAlertsStore as alertsStore } from "~/shared/stores/alerts";
import { useAuthStore, useAuthStore as authStore } from "~/shared/stores/auth";

const client = new GraphQLClient(process.env.REACT_APP_API_URL ?? "", {
  responseMiddleware: (response) => {
    const addAlert = alertsStore.getState().addAlert;

    const unAuth = authStore.getState().unAuth;

    const addErrorAlert = curry(addAlert)("error");

    const errors = (response as unknown as { response: Response<unknown> }).response?.errors;

    const isAuthError =
      errors?.[0]?.extensions.category === "internal" && errors?.[0]?.path?.[0] === "me";

    if (isAuthError) {
      addErrorAlert("Error authorization");
      unAuth();
      return;
    }

    if (errors) {
      errors.forEach(compose(addErrorAlert, prop("message")));
      return;
    }

    if (response instanceof Error) {
      return addErrorAlert(response.message);
    }

    return response;
  }
});

const token = authStore.getState().token;
client.setHeader("Authorization", `Bearer ${token}`);

useAuthStore.subscribe((state) => {
  client.setHeader("Authorization", `Bearer ${state.token}`);
});

export const [useGraphqlClient, GraphQlClientProvider] = createCtx(client, {
  name: "GraphQlClientProvider"
});