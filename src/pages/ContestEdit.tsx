import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteContestMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ContestDetailsForm } from "~/modules/ContestDetailsForm";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ContestPageRoute } from "~/shared/routes";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { useLang } from "~/shared/hooks/useLang";
import { useContestStore } from "~stores/contest";

export const ContestEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const goBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { isSaveLoading } = useContestStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: deleteContest } = useDeleteContestMutation(client, { onSuccess: goBack });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteContest({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "Contest editing" : "Contest creating"}
            backHref={ContestPageRoute}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
            isLoading={isSaveLoading}
            formName='contestForm'
          />
          <ContestDetailsForm id={Number(id)} lang={lang} formName='contestForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
