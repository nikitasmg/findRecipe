import React from "react";
import { Alerts } from "~/shared/components/Alerts";
import { useAlertsStore } from "~/shared/stores/alerts";

export const Snackbar: React.FC = () => {
  const alerts = useAlertsStore((state) => state.alerts);
  const removeAlert = useAlertsStore((state) => state.removeAlert);

  return <Alerts alerts={alerts} removeAlert={removeAlert} />;
};
