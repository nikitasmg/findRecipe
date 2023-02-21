import { Tabs } from "@mui/material";
import React, { SyntheticEvent, useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderTab } from "~/shared/components/HeaderTab";
import { useHeaderTabsStore } from "~/shared/stores/headerTabs";
import { HomePageRoute, NewsPageRoute, UsersPageRoute } from "~shared/routes";

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
        label: "Users",
        path: UsersPageRoute
      }
    ]
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
    const initialValue = pathsResolve[location.pathname];

    if (~initialValue) {
      setActiveTab(initialValue);
    }
  }, [location.pathname, setActiveTab]);

  return (
    <Tabs className='!hidden md:!flex' value={activeTab} onChange={handleTabChange}>
      {tabs.map((tab, i) => (
        <HeaderTab key={tab.label} value={i} tab={tab} handleSelect={handleSelectTab} />
      ))}
    </Tabs>
  );
};
