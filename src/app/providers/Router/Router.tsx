import React from "react";
import { Route, Routes } from "react-router-dom";

import { BaseLayout } from "@/layouts/BaseLayout";

import { NoMatch } from "@/pages/NoMatch";
import { Login } from "@/pages/Login";

import { ProtectedRoutes } from "@/modules/ProtectedRoutes";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<BaseLayout />}></Route>
      </Route>

      <Route
        path='*'
        element={
          <BaseLayout>
            <NoMatch />
          </BaseLayout>
        }
      />
    </Routes>
  );
};
