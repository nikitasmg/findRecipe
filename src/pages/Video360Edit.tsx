import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteVideo360Mutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { useLang } from "~/shared/hooks/useLang";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Video360DetailsForm } from "~/modules/Video360DetailsForm";

export const Video360Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteVideo360 } = useDeleteVideo360Mutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteVideo360({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center p-3'>
          <DetailsHead
            title={isEdit ? "Video 360 editing" : "Video 360 creating"}
            onBackClick={handleGoBack}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
          />
          <Video360DetailsForm id={Number(id)} lang={lang} />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
