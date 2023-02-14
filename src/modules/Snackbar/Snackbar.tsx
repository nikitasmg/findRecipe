import { Alert, Box, Snackbar as MaterialSnackbar } from "@mui/material";
import React, { Fragment } from "react";
import { Text } from "~/shared/components/Text";
import { useAlertsStore } from "~/shared/stores/alerts";

export const Snackbar: React.FC = () => {
  const alerts = useAlertsStore((state) => state.alerts);
  const removeAlert = useAlertsStore((state) => state.removeAlert);

  const isAlertsExist = !!Object.keys(alerts).length;

  return (
    <Fragment>
      <MaterialSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isAlertsExist}
      >
        <Box className='flex flex-col gap-2'>
          {Object.entries(alerts).map(([key, alert]) => {
            const handleClose = () => removeAlert(key);
            return (
              <Alert key={key} onClose={handleClose} severity={alert.severity}>
                <Text component='span'>{alert.message}</Text>
              </Alert>
            );
          })}
        </Box>
      </MaterialSnackbar>
    </Fragment>
  );
};
