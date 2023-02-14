import React, { useLayoutEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderTabsStore } from "~shared/stores/headerTabs";
import { Text } from "~/shared/components/Text";
import { HomePageRoute, NewsPageRoute } from "~/shared/routes";

const tabs = [
  {
    label: "Home",
    path: HomePageRoute
  },
  {
    label: "News",
    path: NewsPageRoute
  }
];

export const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useHeaderTabsStore();

  const history = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    const initialValue = tabs.findIndex((tab) => tab.path === location.pathname);

    if (~initialValue) {
      setActiveTab(initialValue);
    }
  }, [location.pathname, setActiveTab]);

  return (
    <Box component='header' className='px-2 pt-2 border drop-shadow-md'>
      <Tabs
        value={activeTab}
        onChange={(_, value) => {
          setActiveTab(value);
          history(tabs[value].path);
        }}
      >
        {tabs.map((tab, i) => (
          <Tab key={tab.label} value={i} label={<Text>{tab.label}</Text>} />
        ))}
      </Tabs>
    </Box>
  );
};
