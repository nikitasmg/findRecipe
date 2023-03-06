import { Box } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteNewsMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { NewsDetailsForm } from "~/layouts/NewsDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { NewsPageRoute } from "~/shared/routes/index";

export const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const history = useNavigate();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteNews } = useDeleteNewsMutation(client);

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteNews({ id });
    history(NewsPageRoute);
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={isEdit ? "News editing" : "News creating"}
              onBackClick={handleGoBack}
              onRemove={handleDelete}
            />
            <NewsDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
