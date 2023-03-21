import { createCtx } from "~/shared/lib/context";
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
  ProjectsPageRoute,
  DocumentsPageRoute,
  PagesRoute,
  ReportsPageRoute,
  ActivityResultPageRoute
} from "~shared/routes";

const paths = [
  {
    label: "Home",
    path: HomePageRoute
  },
  {
    label: "Entities",
    children: [
      {
        label: "News",
        path: NewsPageRoute
      },
      {
        label: "Events",
        path: EventsPageRoute
      },
      {
        label: "Users",
        path: UsersPageRoute
      },
      {
        label: "Interactive map",
        path: InteractiveMapFormRoute
      },
      {
        label: "Contests",
        path: ContestPageRoute
      },
      {
        label: "Projects",
        path: ProjectsPageRoute
      },
      {
        label: "Documents",
        path: DocumentsPageRoute
      }
    ]
  },
  {
    label: "About fund",
    children: [
      {
        label: "Employees",
        path: EmployeesPage
      },
      {
        label: "Vacancies",
        path: VacanciesPage
      },
      {
        label: "Purchases",
        path: PurchasesPage
      },
      {
        label: "Staff control",
        path: StaffControlPageRoute
      },
      {
        label: "Reports",
        path: ReportsPageRoute
      },
      {
        label: "Activity results",
        path: ActivityResultPageRoute
      }
    ]
  },
  {
    label: "Compilations",
    path: CompilationsPage
  },
  {
    label: "Pages",
    path: PagesRoute
  }
];

export const [usePaths, PathsProvider] = createCtx(paths, { name: "PathsProvider" });
