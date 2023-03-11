import { useAlertsStore as alertsStore } from "~/shared/stores/alerts";

export const getDefaultSuccessCallback = () => {
  return alertsStore.getState().addAlert("success", "Successfully completed");
};
