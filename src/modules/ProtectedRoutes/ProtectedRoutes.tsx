import React, { Fragment, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "~shared/stores/auth";
import { LoginPageRoute } from "~shared/routes";

export const ProtectedRoutes: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to={LoginPageRoute} replace />;
  }

  return <Fragment>{children}</Fragment>;
};
