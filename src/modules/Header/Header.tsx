import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useHeaderTabsStore } from "~shared/stores/headerTabs";

const tabs = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "News",
    path: "/news"
  }
];

export const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useHeaderTabsStore();

  const history = useNavigate();

  return (
    <Box component='header' sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={activeTab}
        onChange={(_, value) => {
          setActiveTab(value);
          history(tabs[value].path);
        }}
      >
        {tabs.map((tab, i) => (
          <Tab key={tab.label} value={i} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};
