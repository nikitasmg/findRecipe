import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteProjectMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ProjectsPageRoute } from "~shared/routes";
import { useNavigationBack } from "~shared/hooks/useBackClick";
import { ProjectsDetailsForm } from "~/modules/ProjectsDetailsForm";

export const ProjectsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteProject } = useDeleteProjectMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteProject({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={isEdit ? "Projects editing" : "Projects creating"}
              backHref={ProjectsPageRoute}
              onRemove={isEdit ? handleDelete : undefined}
            />
            <ProjectsDetailsForm id={Number(id)} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
