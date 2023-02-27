import React, { Fragment, useState } from "react";
import { SettingsTab } from "~/modules/SettingsTabs/types";
import { Box, Tab, Tabs } from "@mui/material";
import { Text } from "~shared/components/Text";
import { TabPanel } from "~shared/components/TabPanel";
import { ContactsForm } from "~/modules/ContactsForm/ContactsForm";

const tabs: SettingsTab[] = [
  {
    label: "Contacts",
    component: <ContactsForm />
  }
];

export const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: unknown, tab: number) => setActiveTab(tab);

  return (
    <Fragment>
      <Box>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {tabs.map(({ label }, index) => (
            <Tab
              key={label}
              label={
                <Box className='flex items-center'>
                  <Text className='normal-case' component='span'>
                    {label}
                  </Text>
                </Box>
              }
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map(({ component }, index) => (
        <TabPanel className='mt-2 pb-8' key={index} value={activeTab} index={index}>
          {component}
        </TabPanel>
      ))}
    </Fragment>
  );
};
