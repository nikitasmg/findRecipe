import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { NewsDetailsForm } from "~/layouts/NewsDetailsForm";

export const NewsCreate: React.FC = () => {
  const history = useNavigate();

  const handleGoBack = useCallback(() => {
    history(-1);
  }, [history]);

  return (
    <Panel>
      <Box className='flex flex-col gap-6'>
        <DetailsHead title='News creating' onBackClick={handleGoBack} />
        <NewsDetailsForm />
      </Box>
    </Panel>
  );
};
