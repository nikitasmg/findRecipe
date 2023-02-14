import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import { BaseLayout } from "~/layouts/BaseLayout";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import { NoMatch } from "~/pages/NoMatch";
import { Login } from "~/pages/Login";
import { News } from "~/pages/News";

import { HomePageRoute, LoginPageRoute, NewsPageRoute } from "~shared/routes";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path={LoginPageRoute} element={<Login />} />
      <Route
        path={HomePageRoute}
        element={
          <BaseProtectedLayout>
            <Link to={NewsPageRoute}>News</Link>
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
