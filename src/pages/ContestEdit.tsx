import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteContestMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ContestDetailsForm } from "~/modules/ContestDetailsForm";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ContestPageRoute } from "~/shared/routes";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

export const ContestEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const goBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteContest } = useDeleteContestMutation(client, { onSuccess: goBack });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteContest({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={isEdit ? "Contest editing" : "Contest creating"}
              backHref={ContestPageRoute}
              onRemove={isEdit ? handleDelete : undefined}
            />
            <ContestDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
