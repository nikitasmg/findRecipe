import React from "react";
import { Route } from "react-router-dom";
import { BaseProtectedLayout } from "~/layouts/BaseProtectedLayout";

import { EditIndexPage } from "~/pages/edit";
import { EditAboutPage } from "~/pages/edit/about";
import { EditCommonInfoPage } from "~/pages/edit/common";
import { EditControlPage } from "~/pages/edit/control";
import { EditEventsPage } from "~/pages/edit/events";
import { EditNewsPage } from "~/pages/edit/news";
import { EditControlItemPage } from "~/pages/edit/control-item";
import { EditStaffPage } from "~/pages/edit/staff";
import { EditResultPage } from "~/pages/edit/result";
import { EditOrdersPage } from "~/pages/edit/orders";
import { EditDocumentsPage } from "~/pages/edit/documents";
import { EditLogosPage } from "~/pages/edit/logos";
import { EditAnoBiomedPage } from "~/pages/edit/ano-biomed";

import {
  PagesEditAbout,
  PagesEditAnoBiomed,
  PagesEditApparatUpravleniya,
  PagesEditCommon,
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
  />
];
