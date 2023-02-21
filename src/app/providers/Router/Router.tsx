import React from "react";
import { Route, Routes } from "react-router-dom";

import { BaseLayout } from "~/layouts/BaseLayout";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import { NoMatch } from "~/pages/NoMatch";
import { Login } from "~/pages/Login";
import { News } from "~/pages/News";
import { Home } from "~/pages/Home";
import { Users } from "~/pages/Users";

import { HomePageRoute, LoginPageRoute, NewsPageRoute, UsersPageRoute } from "~shared/routes";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path={LoginPageRoute} element={<Login />} />
      <Route
        path={HomePageRoute}
        element={
          <BaseProtectedLayout>
            <Home />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={NewsPageRoute}
        element={
          <BaseProtectedLayout>
            <News />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={UsersPageRoute}
        element={
          <BaseProtectedLayout>
            <Users />
          </BaseProtectedLayout>
        }
      />

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
