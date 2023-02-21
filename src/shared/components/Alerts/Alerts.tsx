import React from "react";
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import { Text } from "../Text";

type Props = {
  alerts: Record<string, { severity: AlertColor; message: string }>;
  removeAlert: (key: string) => void;
};

export const Alerts: React.FC<Props> = ({ alerts, removeAlert }) => {
  const isAlertsExist = !!Object.keys(alerts).length;

  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isAlertsExist}>
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
    </Snackbar>
  );
};
