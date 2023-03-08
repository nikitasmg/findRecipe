import React from "react";
import { Route } from "react-router-dom";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import { EditIndexPage } from "~/pages/edit";
import { EditEventsPage } from "~/pages/edit/events";
import { EditNewsPage } from "~/pages/edit/news";

import { PagesEditEvents, PagesEditIndex, PagesEditNews } from "~/shared/routes";

export const PagesEditRouter = [
  <Route
    key='index'
    path={PagesEditIndex}
    element={
      <BaseProtectedLayout>
        <EditIndexPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='news'
    path={PagesEditNews}
    element={
      <BaseProtectedLayout>
        <EditNewsPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='events'
    path={PagesEditEvents}
    element={
      <BaseProtectedLayout>
        <EditEventsPage />
      </BaseProtectedLayout>
    }
  />
];
