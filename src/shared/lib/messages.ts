import { useAlertsStore as alertsStore } from "~/shared/stores/alerts";

export const getDefaultSuccessCreate = () => {
  return alertsStore.getState().addAlert("success", "Successfully create");
};

export const getDefaultSuccessUpdate = () => {
  return alertsStore.getState().addAlert("success", "Successfully update");
};

export const getDefaultSuccessDelete = () => {
  return alertsStore.getState().addAlert("success", "Successfully delete");
};
