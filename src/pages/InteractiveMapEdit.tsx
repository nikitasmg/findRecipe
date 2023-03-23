import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { InteractiveMapDetailsForm } from "~/modules/InteractiveMapDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";

export const InteractiveMapEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead title={"Map object editing"} onBackClick={handleGoBack} />
            <InteractiveMapDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
