import { Backdrop, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import ErrorIcon from "@mui/icons-material/Error";
import { Text } from "../Text";
import { TabPanel } from "../TabPanel";
import { Button } from "../Button";

type Props = {
  forms: {
    tabTitle: string;
    component: ReactNode;
    validate?: () => Promise<void>;
    isValid?: boolean;
    hasErrors?: boolean;
  }[];
  activeStep?: number;
  handleBack?: () => void;
  handleStepChange?: (step: number) => void;
  handleSubmit?: () => void;
  isLoading?: boolean;
};

export const TabsForm: React.FC<Props> = ({
  forms,
  handleBack,
  handleStepChange,
  handleSubmit,
  activeStep = 0,
  isLoading = false
}) => {
  const [step, setStep] = useState(0);

  const handleTabChange = (_: unknown, tab: number) => setStep(tab);

  const isNextExist = step < forms.length - 1;

  const isPrevExist = step >= 0;

  const onNextClick = () => {
    setStep((currentStep) => currentStep + 1);
    handleBack?.();
  };

  const onPrevClick = () => {
    setStep((currentStep) => Math.min(0, currentStep - 1));
  };

  useEffect(() => {
    handleStepChange?.(step);
    forms[step].validate?.();
  }, [forms, step, handleStepChange]);

  useEffect(() => {
    setStep(activeStep);
  }, [activeStep]);

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      {isLoading && (
        <Backdrop className='z-50 !absolute text-white' open>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Box>
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
        <TabPanel className='mt-2 pb-8' key={index} value={step} index={index}>
          {component}
        </TabPanel>
      ))}

      <Box className='flex flex-wrap gap-4'>
        {isPrevExist && (
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            onClick={onPrevClick}
            variant='outlined'
            size='small'
          >
            Back
          </Button>
        )}

        <Box className='flex gap-4 w-full sm:w-auto ml-auto'>
          {isNextExist && (
            <Button onClick={onNextClick} variant='outlined' size='small'>
              Next
            </Button>
          )}

          <Button startIcon={<SaveIcon />} type='submit' variant='contained' size='small'>
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );
};
