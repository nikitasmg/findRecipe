import { Tabs } from "@mui/material";
import React, { SyntheticEvent, useCallback, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePaths } from "~/app/providers/Paths";
import { HeaderTab } from "~/shared/components/HeaderTab";

export const HeaderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [activePath, setActivePath] = useState("/");

  const history = useNavigate();

  const location = useLocation();

  const paths = usePaths();

  const pathsResolve = paths.reduce((res, tab, i) => {
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

  const handleTabChange = useCallback(
    (_: SyntheticEvent<Element, Event> | null, value: number) => {
      setActiveTab(value);

      if (!paths[value].path) {
        return;
      }

      history(paths[value].path ?? "");
    },
    [history, setActiveTab, paths]
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
  }, [location.pathname, setActiveTab, paths, pathsResolve]);

  return (
    <Tabs
      variant='scrollable'
      scrollButtons='auto'
      className='!hidden md:!flex sm:max-w-[700px] lg:max-w-[1200px]'
      value={activeTab ?? false}
      onChange={handleTabChange}
    >
      {paths.map((tab, i) => (
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
