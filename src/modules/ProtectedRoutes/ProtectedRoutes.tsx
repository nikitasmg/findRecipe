import React, { Fragment, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@shared/stores/user";

export const ProtectedRoutes: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Fragment>{children}</Fragment>;
};
