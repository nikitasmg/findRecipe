import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import {
  PagesEditAbout,
  PagesEditAnoBiomed,
  PagesEditApparatUpravleniya,
  PagesEditCommon,
  PagesEditContacts,
  PagesEditControl,
  PagesEditDocuments,
  PagesEditEvents,
  PagesEditGeneralnyyDirektor,
  PagesEditIndex,
  PagesEditLogos,
  PagesEditNablyudatelnyySovet,
  PagesEditNauchnoKonsultacionnyySovet,
  PagesEditNews,
  PagesEditOrders,
  PagesEditPopechitelskiySovet,
  PagesEditResult,
  PagesEditStaff
} from "~/shared/routes";

const EditIndexPage = lazy(() =>
  import("~/pages/edit").then((module) => ({ default: module.EditIndexPage }))
);
const EditAboutPage = lazy(() =>
  import("~/pages/edit/about").then((module) => ({ default: module.EditAboutPage }))
);
const EditCommonInfoPage = lazy(() =>
  import("~/pages/edit/common").then((module) => ({ default: module.EditCommonInfoPage }))
);
const EditControlPage = lazy(() =>
  import("~/pages/edit/control").then((module) => ({ default: module.EditControlPage }))
);
const EditEventsPage = lazy(() =>
  import("~/pages/edit/events").then((module) => ({ default: module.EditEventsPage }))
);
const EditNewsPage = lazy(() =>
  import("~/pages/edit/news").then((module) => ({ default: module.EditNewsPage }))
);
const EditControlItemPage = lazy(() =>
  import("~/pages/edit/control-item").then((module) => ({ default: module.EditControlItemPage }))
);
const EditStaffPage = lazy(() =>
  import("~/pages/edit/staff").then((module) => ({ default: module.EditStaffPage }))
);
const EditResultPage = lazy(() =>
  import("~/pages/edit/result").then((module) => ({ default: module.EditResultPage }))
);
const EditOrdersPage = lazy(() =>
  import("~/pages/edit/orders").then((module) => ({ default: module.EditOrdersPage }))
);

const EditDocumentsPage = lazy(() =>
  import("~/pages/edit/documents").then((module) => ({ default: module.EditDocumentsPage }))
);

const EditLogosPage = lazy(() =>
  import("~/pages/edit/logos").then((module) => ({ default: module.EditLogosPage }))
);

const EditAnoBiomedPage = lazy(() =>
  import("~/pages/edit/ano-biomed").then((module) => ({ default: module.EditAnoBiomedPage }))
);

const EditContactsPage = lazy(() =>
  import("~/pages/edit/contacts").then((module) => ({ default: module.EditContactsPage }))
);

export const PagesEditRouting = [
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
  />,
  <Route
    key='common'
    path={PagesEditCommon}
    element={
      <BaseProtectedLayout>
        <EditCommonInfoPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='popechitelskiy-sovet'
    path={PagesEditPopechitelskiySovet}
    element={
      <BaseProtectedLayout>
        <EditControlItemPage title='Board of Trustees' slug='popechitelskiy-sovet' />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='popechitelskiy-sovet'
    path={PagesEditNablyudatelnyySovet}
    element={
      <BaseProtectedLayout>
        <EditControlItemPage title='Supervisory Board' slug='nablyudatelnyy-sovet' />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='generalnyy-direktor'
    path={PagesEditGeneralnyyDirektor}
    element={
      <BaseProtectedLayout>
        <EditControlItemPage title='CEO' slug='generalnyy-direktor' />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='apparat-upravleniya'
    path={PagesEditApparatUpravleniya}
    element={
      <BaseProtectedLayout>
        <EditControlItemPage title='Management Department' slug='apparat-upravleniya' />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='nauchno-konsultacionnyy-sovet'
    path={PagesEditNauchnoKonsultacionnyySovet}
    element={
      <BaseProtectedLayout>
        <EditControlItemPage
          title='Scientific Advisory Board'
          slug='nauchno-konsultacionnyy-sovet'
        />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='staff'
    path={PagesEditStaff}
    element={
      <BaseProtectedLayout>
        <EditStaffPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='orders'
    path={PagesEditOrders}
    element={
      <BaseProtectedLayout>
        <EditOrdersPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='result'
    path={PagesEditResult}
    element={
      <BaseProtectedLayout>
        <EditResultPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='documents'
    path={PagesEditDocuments}
    element={
      <BaseProtectedLayout>
        <EditDocumentsPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='logos'
    path={PagesEditLogos}
    element={
      <BaseProtectedLayout>
        <EditLogosPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='ano-biomed'
    path={PagesEditAnoBiomed}
    element={
      <BaseProtectedLayout>
        <EditAnoBiomedPage />
      </BaseProtectedLayout>
    }
  />,
  <Route
    key='contacts'
    path={PagesEditContacts}
    element={
      <BaseProtectedLayout>
        <EditContactsPage />
      </BaseProtectedLayout>
    }
  />
];
