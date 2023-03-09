import React from "react";
import { Route } from "react-router-dom";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import { EditIndexPage } from "~/pages/edit";
import { EditAboutPage } from "~/pages/edit/about";
import { EditControlPage } from "~/pages/edit/control";
import { EditEventsPage } from "~/pages/edit/events";
import { EditNewsPage } from "~/pages/edit/news";

import {
  PagesEditAbout,
  PagesEditControl,
  PagesEditEvents,
  PagesEditIndex,
  PagesEditNews
} from "~/shared/routes";

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
  />,
  <Route
    key='about'
    path={PagesEditAbout}
    element={
      <BaseProtectedLayout>
        <EditAboutPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='control'
    path={PagesEditControl}
    element={
      <BaseProtectedLayout>
        <EditControlPage />
      </BaseProtectedLayout>
    }
  />
];
