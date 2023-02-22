import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { NewsDetailsForm } from "~/layouts/NewsDetailsForm";

export const NewsEdit: React.FC = () => {
  const history = useNavigate();

  const { id } = useParams<{ id: string }>();

  const handleGoBack = useCallback(() => {
    history(-1);
  }, [history]);

  return (
    <Panel>
      <Box className='flex flex-col gap-6'>
        <DetailsHead title='News editing' onBackClick={handleGoBack} />
        <NewsDetailsForm id={Number(id)} />
      </Box>
    </Panel>
  );
};
