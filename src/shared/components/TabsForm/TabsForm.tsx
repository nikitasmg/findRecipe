import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Text } from "../Text";
import { TabPanel } from "../TabPanel";
import { red } from "@mui/material/colors";

type Props = {
  forms: {
    tabTitle: string;
    component: ReactNode;
    validate?: () => Promise<void>;
    isValid?: boolean;
    hasErrors?: boolean;
  }[];
  activeStep?: number;
  backHref?: string;
  handleBack?: () => void;
  handleStepChange?: (step: number) => void;
  handleSubmit?: () => void;
  isLoading?: boolean;
  isSaveVisible?: boolean;
  formName?: string;
};

export const TabsForm: React.FC<Props> = ({
  forms,
  handleStepChange,
  handleSubmit,
  activeStep = 0,
  formName
}) => {
  const [step, setStep] = useState(0);

  const handleTabChange = (_: unknown, tab: number) => setStep(tab);

  useEffect(() => {
    handleStepChange?.(step);
    forms[step].validate?.();
  }, [forms, step, handleStepChange]);

  useEffect(() => {
    setStep(activeStep);
  }, [activeStep]);

  return (
    <form id={formName} className='w-full' onSubmit={handleSubmit}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant='scrollable'
          scrollButtons='auto'
          value={step}
          onChange={handleTabChange}
          aria-label='tabs'
        >
          {forms.map(({ tabTitle, hasErrors }, index) => (
            <Tab
              key={index}
              label={
                <Box className='flex items-center gap-x-2'>
                  {hasErrors && <ErrorIcon sx={{ color: red[500] }} />}
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

      {forms.map(({ component }, index) => (
        <TabPanel className='mt-10' key={index} value={step} index={index}>
          {component}
        </TabPanel>
      ))}
    </form>
  );
};
