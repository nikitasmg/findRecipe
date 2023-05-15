import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteActivityResultMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ActivityResultsDetailsForm } from "~/modules/ActivityResultsDetailsForm";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ActivityResultPageRoute } from "~shared/routes";
import { useNavigationBack } from "~shared/hooks/useBackClick";
import { useLang } from "~/shared/hooks/useLang";
import { useActivityResultsStore } from "~stores/activityResult";

export const ActivityResultEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { isSaveLoading } = useActivityResultsStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: remove } = useDeleteActivityResultMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    remove({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "Activity result editing" : "Activity result creating"}
            backHref={ActivityResultPageRoute}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
            isLoading={isSaveLoading}
            formName='activityResultsForm'
          />
          <ActivityResultsDetailsForm id={Number(id)} lang={lang} formName='activityResultsForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
