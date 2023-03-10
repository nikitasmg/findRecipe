import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteVacancyMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { VacanciesDetailsForm } from "~/modules/VacanciesDetailsForm";

export const VacanciesEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteVacancy } = useDeleteVacancyMutation(client);

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteVacancy({ id: Number(id) });
    handleGoBack();
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center p-3'>
          <DetailsHead
            title={isEdit ? "Vacancy editing" : "Vacancy creating"}
            onBackClick={handleGoBack}
            onRemove={handleDelete}
          />
          <VacanciesDetailsForm id={Number(id)} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
