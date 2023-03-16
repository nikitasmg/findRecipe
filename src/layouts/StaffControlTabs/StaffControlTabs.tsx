import React, { useLayoutEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useStaffControlPagesBySlugQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { StaffControlTable } from "~/modules/StaffControlTable";
import { Text } from "~shared/components/Text";
import { TabPanel } from "~/shared/components/TabPanel";

export const StaffControlTabs = () => {
  const [search, setSearch] = useSearchParams();

  const [step, setStep] = useState(0);

  const client = useGraphqlClient();

  const { data } = useStaffControlPagesBySlugQuery(client, {}, { refetchOnMount: "always" });

  const pageIds = useMemo(
    () => [
      data?.popechitelskiy?.id,
      data?.konsultacionnyy?.id,
      data?.direktor?.id,
      data?.apparat?.id,
      data?.nablyudatelnyy?.id
    ],
    [data]
  );

  const handleTabChange = (_: unknown, tab: number) => {
    setStep(tab);
    setSearch((old) => ({ ...old, page_id: pageIds[tab] }));
  };

  const tabs = [
    {
      tabTitle: "Board of Trustees",
      component: <StaffControlTable pageId={pageIds[0]} />
    },
    {
      tabTitle: "Supervisory Board",
      component: <StaffControlTable pageId={pageIds[1]} />
    },
    {
      tabTitle: "CEO",
      component: <StaffControlTable pageId={pageIds[2]} />
    },
    {
      tabTitle: "Management Department",
      component: <StaffControlTable pageId={pageIds[3]} />
    },
    {
      tabTitle: "Scientific Advisory Board",
      component: <StaffControlTable pageId={pageIds[4]} />
    }
  ];

  useLayoutEffect(() => {
    const pageId = Number(search.get("page_id"));

    if (!pageId || !data) {
      return;
    }

    const index = pageIds.findIndex((id) => id === pageId);

    if (~index) {
      setStep(index);
      return;
    }
  }, [pageIds, search, data]);

  return (
    <Box className='relative'>
      <Text component='h1' variant='h6'>
        Edit staff control
      </Text>

      <Box className='mt-4'>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant='scrollable'
            scrollButtons='auto'
            value={step}
            onChange={handleTabChange}
            aria-label='tabs'
          >
            {tabs.map(({ tabTitle }, index) => (
              <Tab
                key={tabTitle}
                label={
                  <Box className='flex items-center'>
                    <Text className='normal-case' component='span'>
                      {tabTitle}
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
          <TabPanel className='mt-8' key={index} value={step} index={index}>
            {index === step && component}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};
