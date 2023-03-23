import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteDocumentGroupMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { DocumentsPageRoute } from "~shared/routes";
import { useNavigationBack } from "~shared/hooks/useBackClick";
import { useDocumentGroupByIdQuery } from "../generated/graphql";
import { LinkedDocumentView } from "~/modules/LinkedGroupDocumentView";

export const GroupDocuments: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: remove } = useDeleteDocumentGroupMutation(client, {
    onSuccess: handleGoBack
  });

  const { data, isLoading } = useDocumentGroupByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !!id }
  );

  const handleDelete = () => {
    if (!id) {
      return;
    }

    remove({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-10 p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={!isLoading ? data?.documentGroupById?.name ?? "Group" : ""}
              backHref={DocumentsPageRoute}
              onRemove={isEdit ? handleDelete : undefined}
            />
          </Box>
          <LinkedDocumentView groupId={Number(id)} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
