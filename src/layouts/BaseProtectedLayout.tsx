import React, { PropsWithChildren } from "react";
import { ProtectedRoutes } from "@/modules/ProtectedRoutes";
import { BaseLayout } from "./BaseLayout";

export const BaseProtectedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRoutes>
      <BaseLayout>{children}</BaseLayout>
    </ProtectedRoutes>
  );
};
