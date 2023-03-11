import { Box } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteContestMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ContestDetailsForm } from "~/modules/ContestDetailsForm";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ContestPageRoute } from "~/shared/routes";

export const ContestEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const history = useNavigate();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteContest } = useDeleteContestMutation(client);

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteContest({ id: Number(id) });
    history(ContestPageRoute);
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={isEdit ? "Contest editing" : "Contest creating"}
              backHref={ContestPageRoute}
              onRemove={handleDelete}
            />
            <ContestDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
