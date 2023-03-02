import { Tabs } from "@mui/material";
import React, { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTab } from "~/shared/components/HeaderTab";
import { useHeaderTabsStore } from "~/shared/stores/headerTabs";
import {
  CompilationsPage,
  EventsPageRoute,
  HomePageRoute,
  NewsPageRoute,
  UsersPageRoute
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
      }
    ]
  },
  {
    label: "Compilations",
    path: CompilationsPage
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

    if (initialValue) {
      setActiveTab(initialValue);
      setActivePath(path);
    }
  }, [location.pathname, setActiveTab]);

  return (
    <Tabs className='!hidden md:!flex' value={activeTab} onChange={handleTabChange}>
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
