import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { NewsDetailsForm } from "~/layouts/NewsDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";

export const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  return (
    <Panel>
      <Box className='flex flex-col gap-6'>
        <DetailsHead title='News editing' onBackClick={handleGoBack} />
        <NewsDetailsForm id={Number(id)} />
      </Box>
    </Panel>
  );
};
