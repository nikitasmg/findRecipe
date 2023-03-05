import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteEmployeeMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { EmployeesDetailsForm } from "~/modules/EmployeesDetailsForm";

export const EmployeesEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteEmployee } = useDeleteEmployeeMutation(client);

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteEmployee({ id });
    handleGoBack();
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center p-3'>
          <DetailsHead
            title={isEdit ? "Employee editing" : "Employee creating"}
            onBackClick={handleGoBack}
            onRemove={handleDelete}
          />
          <EmployeesDetailsForm id={Number(id)} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
