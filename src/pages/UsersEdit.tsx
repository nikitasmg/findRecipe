import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteUserMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { UsersPageRoute } from "~shared/routes";
import { useNavigationBack } from "~shared/hooks/useBackClick";
import { UsersDetailsForm } from "~/modules/UsersDetailsForm";
import { useUsersStore } from "~stores/users";

export const UsersEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { isSaveLoading } = useUsersStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: deleteUser } = useDeleteUserMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteUser({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "User editing" : "User creating"}
            backHref={UsersPageRoute}
            onRemove={isEdit ? handleDelete : undefined}
            formName='usersForm'
            isLoading={isSaveLoading}
          />
          <UsersDetailsForm id={Number(id)} formName='usersForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
