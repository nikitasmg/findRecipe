import { Box } from "@mui/material";
import React from "react";
import { NewsDetailsForm } from "~/layouts/NewsDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";

export const NewsCreate: React.FC = () => {
  const handleGoBack = useNavigationBack();

  return (
    <Panel>
      <Box className='flex flex-col gap-6'>
        <DetailsHead title='News creating' onBackClick={handleGoBack} />
        <NewsDetailsForm />
      </Box>
    </Panel>
  );
};
