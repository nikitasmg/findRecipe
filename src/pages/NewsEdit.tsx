import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { NewsDetailsForm } from "~/layouts/NewsDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";

export const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "News editing" : "News creating"}
            onBackClick={handleGoBack}
          />
          <NewsDetailsForm id={Number(id)} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
