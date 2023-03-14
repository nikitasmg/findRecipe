import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteEventMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { EventsDetailsForm } from "~/modules/EventsDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";

export const EventsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteNews } = useDeleteEventMutation(client, { onSuccess: handleGoBack });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteNews({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={isEdit ? "Events editing" : "Events creating"}
              onBackClick={handleGoBack}
              onRemove={isEdit ? handleDelete : undefined}
            />
            <EventsDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
