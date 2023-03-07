import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import ErrorIcon from "@mui/icons-material/Error";
import { Text } from "../Text";
import { TabPanel } from "../TabPanel";
import { Button } from "../Button";
import { LinkButton } from "../LinkButton";

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
};

export const TabsForm: React.FC<Props> = ({
  forms,
  handleBack,
  backHref,
  handleStepChange,
  handleSubmit,
  activeStep = 0,
  isLoading
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
    <form className='w-full' onSubmit={handleSubmit}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={step} onChange={handleTabChange} aria-label='basic tabs example'>
          {forms.map(({ tabTitle, hasErrors }, index) => (
            <Tab
              key={tabTitle}
              label={
                <Box className='flex items-center'>
                  {hasErrors && <ErrorIcon />}
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
        <TabPanel className='mt-8' key={index} value={step} index={index}>
          {component}
        </TabPanel>
      ))}

      <Box className='flex flex-wrap gap-4 pt-2 mt-16'>
        {(handleBack || backHref) && (
          <LinkButton
            startIcon={<ArrowBackIosNewIcon />}
            onClick={handleBack}
            href={backHref}
            variant='outlined'
            size='small'
          >
            Back
          </LinkButton>
        )}

        <Box className='flex gap-4 w-full sm:w-auto ml-auto'>
          <Button
            startIcon={<SaveIcon />}
            disabled={isLoading}
            type='submit'
            variant='contained'
            size='small'
          >
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
};
