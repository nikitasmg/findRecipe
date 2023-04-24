import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { BaseLayout } from "~/layouts/BaseLayout";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";
import { GuestRoutes } from "~/modules/GuestRoutes";

import {
  HomePageRoute,
  LoginPageRoute,
  NewsPageCreate,
  NewsPageEdit,
  NewsPageRoute,
  UsersPageRoute,
  UsersPageEdit,
  UsersPageCreate,
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
  PagesRoute,
  InteractiveMapFormRoute,
  PurchasesPage,
  PurchasesPageEdit,
  PurchasesPageCreate,
  ContestPageEdit,
  ContestPageCreate,
  ContestPageRoute,
  StaffControlPageRoute,
  ProjectsPageRoute,
  ProjectsPageEdit,
  ProjectsPageCreate,
  DocumentsPageRoute,
  ActivityResultPageRoute,
  ActivityResultPageCreate,
  ActivityResultPageEdit,
  ReportsPageRoute,
  ReportsPageCreate,
  ReportsPageEdit,
  GroupDocumentsRoute,
  InteractiveMapPageEdit,
  BroadcastsPageRoute,
  BroadcastsPageEdit,
  BroadcastsPageCreate,
  ClustersPageRoute,
  ClustersPageEdit,
  ClustersPageCreate,
  StcPhotoGalleryPageRoute,
  StcPhotoGalleryPageEdit,
  StcPhotoGalleryPageCreate,
  Video360PageRoute,
  Video360PageEdit,
  Video360PageCreate
} from "~shared/routes";

import { PagesEditRouting } from "./PagesEditRouting";

const NoMatch = lazy(() =>
  import("~/pages/NoMatch").then((module) => ({ default: module.NoMatch }))
);
const Login = lazy(() => import("~/pages/Login").then((module) => ({ default: module.Login })));
const News = lazy(() => import("~/pages/News").then((module) => ({ default: module.News })));
const Home = lazy(() => import("~/pages/Home").then((module) => ({ default: module.Home })));
const Users = lazy(() => import("~/pages/Users").then((module) => ({ default: module.Users })));
const UsersEdit = lazy(() =>
  import("~/pages/UsersEdit").then((module) => ({ default: module.UsersEdit }))
);
const NewsEdit = lazy(() =>
  import("~/pages/NewsEdit").then((module) => ({ default: module.NewsEdit }))
);
const Compilations = lazy(() =>
  import("~/pages/Compilations").then((module) => ({ default: module.Compilations }))
);
const Settings = lazy(() =>
  import("~/pages/Settings").then((module) => ({ default: module.Settings }))
);
const Events = lazy(() => import("~/pages/Events").then((module) => ({ default: module.Events })));
const CompilationsEdit = lazy(() =>
  import("~/pages/CompilationsEdit").then((module) => ({ default: module.CompilationsEdit }))
);
const EventsEdit = lazy(() =>
  import("~/pages/EventsEdit").then((module) => ({ default: module.EventsEdit }))
);
const Employees = lazy(() =>
  import("~/pages/Employees").then((module) => ({ default: module.Employees }))
);
const EmployeesEdit = lazy(() =>
  import("~/pages/EmployeesEdit").then((module) => ({ default: module.EmployeesEdit }))
);
const Vacancies = lazy(() =>
  import("~/pages/Vacancies").then((module) => ({ default: module.Vacancies }))
);
const VacanciesEdit = lazy(() =>
  import("~/pages/VacanciesEdit").then((module) => ({ default: module.VacanciesEdit }))
);
const Pages = lazy(() => import("~/pages/Pages").then((module) => ({ default: module.Pages })));
const InteractiveMap = lazy(() =>
  import("~/pages/InteractiveMap").then((module) => ({ default: module.InteractiveMap }))
);
const Purchases = lazy(() =>
  import("~/pages/Purchases").then((module) => ({ default: module.Purchases }))
);
const PurchasesEdit = lazy(() =>
  import("~/pages/PurchasesEdit").then((module) => ({ default: module.PurchasesEdit }))
);
const Contest = lazy(() =>
  import("~/pages/Contest").then((module) => ({ default: module.Contest }))
);
const ContestEdit = lazy(() =>
  import("~/pages/ContestEdit").then((module) => ({ default: module.ContestEdit }))
);
const StaffControl = lazy(() =>
  import("~/pages/StaffControl").then((module) => ({ default: module.StaffControl }))
);
const Projects = lazy(() =>
  import("~/pages/Projects").then((module) => ({ default: module.Projects }))
);
const ProjectsEdit = lazy(() =>
  import("~/pages/ProjectsEdit").then((module) => ({ default: module.ProjectsEdit }))
);
const Documents = lazy(() =>
  import("~/pages/Documents").then((module) => ({ default: module.Documents }))
);
const Broadcasts = lazy(() =>
  import("~/pages/Broadcasts").then((module) => ({ default: module.Broadcasts }))
);
const BroadcastsEdit = lazy(() =>
  import("~/pages/BroadcastsEdit").then((module) => ({ default: module.BroadcastsEdit }))
);
const Video360 = lazy(() =>
  import("~/pages/Video360").then((module) => ({ default: module.Video360 }))
);
const Video360Edit = lazy(() =>
  import("~/pages/Video360Edit").then((module) => ({ default: module.Video360Edit }))
);
const StcPhotoGallery = lazy(() =>
  import("~/pages/StcPhotoGallery").then((module) => ({ default: module.StcPhotoGallery }))
);
const StcPhotoGalleryEdit = lazy(() =>
  import("~/pages/StcPhotoGalleryEdit").then((module) => ({ default: module.StcPhotoGalleryEdit }))
);
const ActivityResult = lazy(() =>
  import("~/pages/ActivityResult").then((module) => ({ default: module.ActivityResult }))
);
const ActivityResultEdit = lazy(() =>
  import("~/pages/ActivityResultEdit").then((module) => ({ default: module.ActivityResultEdit }))
);
const Reports = lazy(() =>
  import("~/pages/Reports").then((module) => ({ default: module.Reports }))
);
const ReportsEdit = lazy(() =>
  import("~/pages/ReportsEdit").then((module) => ({ default: module.ReportsEdit }))
);
const GroupDocuments = lazy(() =>
  import("~/pages/GroupDocuments").then((module) => ({
    default: module.GroupDocuments
  }))
);
const InteractiveMapEdit = lazy(() =>
  import("~/pages/InteractiveMapEdit").then((module) => ({
    default: module.InteractiveMapEdit
  }))
);
const Clusters = lazy(() =>
  import("~/pages/Clusters").then((module) => ({ default: module.Clusters }))
);
const ClustersEdit = lazy(() =>
  import("~/pages/ClustersEdit").then((module) => ({ default: module.ClustersEdit }))
);

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route
        path={LoginPageRoute}
        element={
          <GuestRoutes>
            <Login />
          </GuestRoutes>
        }
      />
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
        path={UsersPageEdit}
        element={
          <BaseProtectedLayout>
            <UsersEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={UsersPageCreate}
        element={
          <BaseProtectedLayout>
            <UsersEdit />
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
        path={PagesRoute}
        element={
          <BaseProtectedLayout>
            <Pages />
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
        path={InteractiveMapFormRoute}
        element={
          <BaseProtectedLayout>
            <InteractiveMap />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={InteractiveMapPageEdit}
        element={
          <BaseProtectedLayout>
            <InteractiveMapEdit />
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
        path={ContestPageRoute}
        element={
          <BaseProtectedLayout>
            <Contest />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ContestPageEdit}
        element={
          <BaseProtectedLayout>
            <ContestEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ContestPageCreate}
        element={
          <BaseProtectedLayout>
            <ContestEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={StaffControlPageRoute}
        element={
          <BaseProtectedLayout>
            <StaffControl />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ProjectsPageRoute}
        element={
          <BaseProtectedLayout>
            <Projects />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ProjectsPageEdit}
        element={
          <BaseProtectedLayout>
            <ProjectsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ProjectsPageCreate}
        element={
          <BaseProtectedLayout>
            <ProjectsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={DocumentsPageRoute}
        element={
          <BaseProtectedLayout>
            <Documents />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={BroadcastsPageRoute}
        element={
          <BaseProtectedLayout>
            <Broadcasts />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={BroadcastsPageEdit}
        element={
          <BaseProtectedLayout>
            <BroadcastsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={BroadcastsPageCreate}
        element={
          <BaseProtectedLayout>
            <BroadcastsEdit />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={Video360PageRoute}
        element={
          <BaseProtectedLayout>
            <Video360 />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={Video360PageEdit}
        element={
          <BaseProtectedLayout>
            <Video360Edit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={Video360PageCreate}
        element={
          <BaseProtectedLayout>
            <Video360Edit />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={StcPhotoGalleryPageRoute}
        element={
          <BaseProtectedLayout>
            <StcPhotoGallery />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={StcPhotoGalleryPageEdit}
        element={
          <BaseProtectedLayout>
            <StcPhotoGalleryEdit />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={StcPhotoGalleryPageCreate}
        element={
          <BaseProtectedLayout>
            <StcPhotoGalleryEdit />
          </BaseProtectedLayout>
        }
      />
      <Route
        path={ActivityResultPageRoute}
        element={
          <BaseProtectedLayout>
            <ActivityResult />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ActivityResultPageCreate}
        element={
          <BaseProtectedLayout>
            <ActivityResultEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ActivityResultPageEdit}
        element={
          <BaseProtectedLayout>
            <ActivityResultEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ReportsPageRoute}
        element={
          <BaseProtectedLayout>
            <Reports />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ReportsPageCreate}
        element={
          <BaseProtectedLayout>
            <ReportsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ReportsPageEdit}
        element={
          <BaseProtectedLayout>
            <ReportsEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={GroupDocumentsRoute}
        element={
          <BaseProtectedLayout>
            <GroupDocuments />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ClustersPageRoute}
        element={
          <BaseProtectedLayout>
            <Clusters />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ClustersPageEdit}
        element={
          <BaseProtectedLayout>
            <ClustersEdit />
          </BaseProtectedLayout>
        }
      />

      <Route
        path={ClustersPageCreate}
        element={
          <BaseProtectedLayout>
            <ClustersEdit />
          </BaseProtectedLayout>
        }
      />

      {PagesEditRouting}

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
