import React, { Fragment, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "~shared/stores/auth";
import { HomePageRoute } from "~/shared/routes";

export const GuestRoutes: React.FC<PropsWithChildren> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to={HomePageRoute} replace />;
  }

  return <Fragment>{children}</Fragment>;
};
