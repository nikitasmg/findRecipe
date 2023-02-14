import { AlertColor } from "@mui/material";
import { create } from "zustand";

export type AlertsState = {
  alerts: Record<string, { severity: AlertColor; message: string }>;

  addAlert: (_severity: AlertColor, _message: string) => void;
  removeAlert: (_id: keyof AlertsState["alerts"]) => void;
};

export const useAlertsStore = create<AlertsState>(
  (set): AlertsState => ({
    alerts: Object.create(null),
    addAlert: (severity: AlertColor, message: string) => {
      const newId = String(new Date().getTime());
      set((state) => ({
        alerts: { ...state.alerts, [newId]: { severity, message } }
      }));

      const autoRemoveTimeout = 2000;

      setTimeout(() => {
        set((state) => {
          if (state.alerts[newId]) {
            const newAlerts = { ...state.alerts };

            delete newAlerts[newId];

            return { alerts: newAlerts };
          }

          return state;
        });
      }, autoRemoveTimeout);
    },

    removeAlert: (id) =>
      set((state) => {
        const newAlerts = { ...state.alerts };

        delete newAlerts[id];

        return { alerts: newAlerts };
      })
  })
);
