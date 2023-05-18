import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteEmployeeMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { EmployeesDetailsForm } from "~/modules/EmployeesDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useLang } from "~/shared/hooks/useLang";
import { useEmployeesStore } from "~stores/employees";

export const EmployeesEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { isSaveLoading } = useEmployeesStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: deleteEmployee } = useDeleteEmployeeMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteEmployee({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            onBackClick={handleGoBack}
            {...(isEdit
              ? {
                  title: "Employee editing",
                  onRemove: handleDelete
                }
              : {
                  title: "Employee creating"
                })}
            onLangChange={setLang}
            isLoading={isSaveLoading}
            formName='employeesForm'
          />
          <EmployeesDetailsForm id={Number(id)} lang={lang} formName='employeesForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
