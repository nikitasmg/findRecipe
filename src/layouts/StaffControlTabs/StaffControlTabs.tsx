import React, { useLayoutEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useStaffControlItemsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { StaffControlTable } from "~/modules/StaffControlTable";
import { Text } from "~shared/components/Text";
import { TabPanel } from "~/shared/components/TabPanel";

export const StaffControlTabs = () => {
  const [search, setSearch] = useSearchParams();

  const [step, setStep] = useState(0);

  const client = useGraphqlClient();

  const { data } = useStaffControlItemsQuery(client, {}, { refetchOnMount: "always" });

  const pageIds: number[] = useMemo(
    () =>
      data?.pages[0].children?.reduce((res: number[], cur) => {
        if (cur?.id) {
          res.push(cur.id);
        }

        return res;
      }, []) ?? [],
    [data]
  );

  const handleTabChange = (_: unknown, tab: number) => {
    setStep(tab);
    setSearch((old) => ({ ...old, page_id: pageIds[tab] }));
  };

  const tabs = useMemo(
    () =>
      data?.pages[0].children?.map((item) => ({
        tabTitle: item?.name,
        component: <StaffControlTable pageId={item?.id} />
      })),
    [data]
  );

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
            {tabs?.map(({ tabTitle }, index) => (
              <Tab
                key={tabTitle}
                label={
                  <Box className='flex items-center'>
                    <Text className='normal-case' component='span'>
                      {tabTitle ?? ""}
                    </Text>
                  </Box>
                }
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>

        {tabs?.map(({ component }, index) => (
          <TabPanel className='mt-8' key={index} value={step} index={index}>
            {index === step && component}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};
