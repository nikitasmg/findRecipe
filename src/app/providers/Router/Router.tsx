import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import { BaseLayout } from "@/layouts/BaseLayout";

import { NoMatch } from "@/pages/NoMatch";
import { Login } from "@/pages/Login";
import { News } from "@/pages/News";

import { HomePage, LoginPage, NewsPage } from "@/shared/routes";
import { BaseProtectedLayout } from "@/layouts/BaseProtectedLayout";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path={LoginPage} element={<Login />} />
      <Route
        path={HomePage}
        element={
          <BaseProtectedLayout>
            <Link to={NewsPage}>News</Link>
          </BaseProtectedLayout>
        }
      />
      <Route
        path={NewsPage}
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
