import React from "react";
import { createCtx } from "~/shared/lib/context";
import { Text } from "~/shared/components/Text";
import {
  HomePageRoute,
  NewsPageRoute,
  UsersPageRoute,
  EventsPageRoute,
  CompilationsPage,
  InteractiveMapFormRoute,
  ContestPageRoute,
  EmployeesPage,
  VacanciesPage,
  PurchasesPage,
  StaffControlPageRoute,
  ProjectsPageRoute
} from "~shared/routes";

const paths = [
  {
    title: <Text component='span'>Home</Text>,
    path: HomePageRoute
  },
  {
    title: <Text component='span'>Entities</Text>,
    children: [
      {
        title: <Text component='span'>News</Text>,
        path: NewsPageRoute
      },
      {
        title: <Text component='span'>Events</Text>,
        path: EventsPageRoute
      },
      {
        title: <Text component='span'>Users</Text>,
        path: UsersPageRoute
      },
      {
        title: <Text component='span'>Interactive map</Text>,
        path: InteractiveMapFormRoute
      },
      {
        title: <Text component='span'>Contests</Text>,
        path: ContestPageRoute
      },
      {
        title: <Text component='span'>Projects</Text>,
        path: ProjectsPageRoute
      }
    ]
  },
  {
    title: <Text component='span'>About fund</Text>,
    children: [
      {
        title: <Text component='span'>Employees</Text>,
        path: EmployeesPage
      },
      {
        title: <Text component='span'>Vacancies</Text>,
        path: VacanciesPage
      },
      {
        title: <Text component='span'>Purchases</Text>,
        path: PurchasesPage
      },
      {
        title: <Text component='span'>Staff control</Text>,
        path: StaffControlPageRoute
      }
    ]
  },
  {
    title: <Text component='span'>Compilations</Text>,
    path: CompilationsPage
  }
];

export const [usePaths, PathsProvider] = createCtx(paths, { name: "PathsProvider" });
