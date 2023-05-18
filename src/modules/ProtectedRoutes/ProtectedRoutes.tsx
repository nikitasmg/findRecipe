import React, { Fragment, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useMeQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useAuthStore } from "~shared/stores/auth";
import { LoginPageRoute } from "~shared/routes";

export const ProtectedRoutes: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  const client = useGraphqlClient();

  const { isSuccess } = useMeQuery(client);

  if (!isSuccess) {
    return (
      <Box className='w-full h-full flex items-center justify-center'>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to={LoginPageRoute} replace />;
  }

  return <Fragment>{children}</Fragment>;
};
