import { GraphQLClient } from "graphql-request";
import { Response } from "graphql-request/dist/types";
import { compose, curry, prop } from "rambda";
import { LoginPageRoute } from "~/shared/routes";
import { useAlertsStore as alertsStore } from "~/shared/stores/alerts";
import { useAuthStore, useAuthStore as authStore } from "~/shared/stores/auth";
import {
  getDefaultSuccessDelete,
  getDefaultSuccessUpdate,
  getDefaultSuccessCreate
} from "~/shared/lib/messages";
import { createCtx } from "~/shared/lib/context";

const goToLoginPage = () => (window.location = LoginPageRoute as unknown as Location);

const handleSuccessResponse = (response: Response<unknown>) => {
  const data = response.data;

  if (!data) {
    return;
  }

  const key = Object.keys(data)[0];

  const isCreate = key.startsWith("create");

  const isUpsert = key.startsWith("upsert");

  const isDelete = key.startsWith("delete");

  if (isCreate) {
    getDefaultSuccessCreate();
  }

  if (isUpsert) {
    getDefaultSuccessUpdate();
  }

  if (isDelete) {
    getDefaultSuccessDelete();
  }

  return response;
};

const client = new GraphQLClient(process.env.REACT_APP_API_URL ?? "", {
  responseMiddleware: (response) => {
    const addAlert = alertsStore.getState().addAlert;

    const unAuth = authStore.getState().unAuth;

    const addErrorAlert = curry(addAlert)("error");

    const errors = (response as unknown as { response: Response<unknown> }).response?.errors;

    const categoryError = errors?.[0]?.extensions.category;

    const isAuthError =
      (categoryError === "internal" && errors?.[0]?.path?.[0] === "me") ||
      categoryError === "authentication";

    if (isAuthError) {
      addErrorAlert("Error authorization");
      unAuth();
      goToLoginPage();
      return;
    }

    if (errors) {
      errors.forEach(compose(addErrorAlert, prop("message")));
      return;
    }

    if (response instanceof Error) {
      return addErrorAlert(response.message);
    }

    handleSuccessResponse(response);

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
