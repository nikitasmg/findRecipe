import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteEventMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ClustersDetailsForm } from "~/modules/ClustersDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useLang } from "~/shared/hooks/useLang";
import { useClustersStore } from "~stores/clusters";

export const ClustersEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { isSaveLoading } = useClustersStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: deleteNews } = useDeleteEventMutation(client, { onSuccess: handleGoBack });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteNews({ id: Number(id) });
  };

  const { lang, setLang } = useLang();

  const headProps = isEdit
    ? {
        title: "Cluster editing",
        onRemove: handleDelete
      }
    : {
        title: "Cluster creating"
      };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            onBackClick={handleGoBack}
            onLangChange={setLang}
            isLoading={isSaveLoading}
            formName='clustersForm'
            {...headProps}
          />
          <ClustersDetailsForm id={Number(id)} lang={lang} formName='clustersForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
