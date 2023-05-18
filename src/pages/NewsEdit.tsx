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
import { useLang } from "~/shared/hooks/useLang";
import { useNewsStore } from "~stores/news";

export const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const isEdit = Number.isInteger(Number(id));

  const goBack = useNavigationBack();

  const client = useGraphqlClient();

  const { isSaveLoading } = useNewsStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

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
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "News editing" : "News creating"}
            backHref={NewsPageRoute}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
            formName='newsForm'
            isLoading={isSaveLoading}
          />
          <NewsDetailsForm id={Number(id)} lang={lang} formName='newsForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
