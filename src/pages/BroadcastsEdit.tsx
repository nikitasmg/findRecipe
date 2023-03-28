import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteVideoBroadcastMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { BroadcastsDetailsForm } from "~/modules/BroadcastsDetailsForm";

export const BroadcastsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteVideoBroadcast } = useDeleteVideoBroadcastMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteVideoBroadcast({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center p-3'>
          <DetailsHead
            title={isEdit ? "Broadcast editing" : "Broadcast creating"}
            onBackClick={handleGoBack}
            onRemove={isEdit ? handleDelete : undefined}
          />
          <BroadcastsDetailsForm id={Number(id)} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
