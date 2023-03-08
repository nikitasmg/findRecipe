import React from "react";
import { Route, Routes } from "react-router-dom";

import { BaseLayout } from "~/layouts/BaseLayout";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import { NoMatch } from "~/pages/NoMatch";
import { Login } from "~/pages/Login";
import { News } from "~/pages/News";
import { Home } from "~/pages/Home";
import { Users } from "~/pages/Users";
import { NewsEdit } from "~/pages/NewsEdit";
import { Compilations } from "~/pages/Compilations";
import { Settings } from "~/pages/Settings";
import { Events } from "~/pages/Events";
import { CompilationsEdit } from "~/pages/CompilationsEdit";
import { EventsEdit } from "~/pages/EventsEdit";
import { Employees } from "~/pages/Employees";
import { EmployeesEdit } from "~/pages/EmployeesEdit";
import { Vacancies } from "~/pages/Vacancies";
import { VacanciesEdit } from "~/pages/VacanciesEdit";
import { Purchases } from "~/pages/Purchases";
import { PurchasesEdit } from "~/pages/PurchasesEdit";

import {
  HomePageRoute,
  LoginPageRoute,
  NewsPageCreate,
  NewsPageEdit,
  NewsPageRoute,
  UsersPageRoute,
  CompilationsPage,
  SettingsPage,
  CompilationEditPage,
  EventsPageRoute,
  EventsPageEdit,
  EventsPageCreate,
  EmployeesPage,
  EmployeesPageEdit,
  EmployeesPageCreate,
  VacanciesPage,
  VacanciesPageEdit,
  VacanciesPageCreate,
  PurchasesPage,
  PurchasesPageEdit,
  PurchasesPageCreate
} from "~shared/routes";

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
        path={NewsPageEdit}
        element={
          <BaseProtectedLayout>
            <NewsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={NewsPageCreate}
        element={
          <BaseProtectedLayout>
            <NewsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={EventsPageRoute}
        element={
          <BaseProtectedLayout>
            <Events />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={EventsPageEdit}
        element={
          <BaseProtectedLayout>
            <EventsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={EventsPageCreate}
        element={
          <BaseProtectedLayout>
            <EventsEdit />
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
        path={CompilationsPage}
        element={
          <BaseProtectedLayout>
            <Compilations />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={CompilationEditPage}
        element={
          <BaseProtectedLayout>
            <CompilationsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={SettingsPage}
        element={
          <BaseProtectedLayout>
            <Settings />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={EmployeesPage}
        element={
          <BaseProtectedLayout>
            <Employees />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={EmployeesPageEdit}
        element={
          <BaseProtectedLayout>
            <EmployeesEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={EmployeesPageCreate}
        element={
          <BaseProtectedLayout>
            <EmployeesEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={VacanciesPage}
        element={
          <BaseProtectedLayout>
            <Vacancies />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={VacanciesPageEdit}
        element={
          <BaseProtectedLayout>
            <VacanciesEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={VacanciesPageCreate}
        element={
          <BaseProtectedLayout>
            <VacanciesEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={PurchasesPage}
        element={
          <BaseProtectedLayout>
            <Purchases />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={PurchasesPageEdit}
        element={
          <BaseProtectedLayout>
            <PurchasesEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={PurchasesPageCreate}
        element={
          <BaseProtectedLayout>
            <PurchasesEdit />
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
