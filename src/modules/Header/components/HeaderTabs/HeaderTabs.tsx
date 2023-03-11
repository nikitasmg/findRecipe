import { Tabs } from "@mui/material";
import React, { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTab } from "~/shared/components/HeaderTab";
import { useHeaderTabsStore } from "~/shared/stores/headerTabs";
import {
  CompilationsPage,
  EmployeesPage,
  EventsPageRoute,
  HomePageRoute,
  NewsPageRoute,
  PurchasesPage,
  UsersPageRoute,
  VacanciesPage,
  PagesRoute,
  InteractiveMapFormRoute,
  ContestPageRoute,
  ProjectsPageRoute
} from "~shared/routes";

const tabs: HeaderTab[] = [
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

const pathsResolve = tabs.reduce((res, tab, i) => {
  if (tab.path) {
    res[tab.path] = i;
  }

  tab.children?.forEach((child) => {
    if (!child.path) {
      return;
    }
    res[child.path] = i;
  });

  return res;
}, Object.create(null));

export const HeaderTabs: React.FC = () => {
  const { activeTab, setActiveTab } = useHeaderTabsStore();

  const [activePath, setActivePath] = useState("/");

  const history = useNavigate();

  const location = useLocation();

  const handleTabChange = useCallback(
    (_: SyntheticEvent<Element, Event> | null, value: number) => {
      setActiveTab(value);

      if (!tabs[value].path) {
        return;
      }

      history(tabs[value].path ?? "");
    },
    [history, setActiveTab]
  );

  const handleSelectTab = useCallback(
    (value: number) => {
      handleTabChange(null, value);
    },
    [handleTabChange]
  );

  useLayoutEffect(() => {
    const path = location.pathname.match(/^\/([^?/]*)/g)?.[0] ?? location.pathname;
    const initialValue = pathsResolve[path];

    setActiveTab(initialValue);
    setActivePath(path);
  }, [location.pathname, setActiveTab]);

  return (
    <Tabs
      variant='scrollable'
      scrollButtons='auto'
      className='!hidden md:!flex sm:max-w-[500px] lg:max-w-[1000px]'
      value={activeTab}
      onChange={handleTabChange}
    >
      {tabs.map((tab, i) => (
        <HeaderTab
          key={tab.label}
          activePath={activePath}
          value={i}
          tab={tab}
          handleSelect={handleSelectTab}
        />
      ))}
    </Tabs>
  );
};
