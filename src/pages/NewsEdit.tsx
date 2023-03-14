import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteNewsMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { NewsDetailsForm } from "~/modules/NewsDetailsForm";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { NewsPageRoute } from "~/shared/routes/index";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

export const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const isEdit = Number.isInteger(Number(id));

  const goBack = useNavigationBack();

  const client = useGraphqlClient();

  const { mutateAsync: deleteNews } = useDeleteNewsMutation(client, { onSuccess: goBack });

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
              title={isEdit ? "News editing" : "News creating"}
              backHref={NewsPageRoute}
              onRemove={isEdit ? handleDelete : undefined}
            />
            <NewsDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
