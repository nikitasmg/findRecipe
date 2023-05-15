import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteStcPhotoGalleryMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { useLang } from "~/shared/hooks/useLang";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { StcPhotoGalleryDetailsForm } from "~/modules/StcPhotoGalleryDetailForm";
import { useStcPhotoGalleryStore } from "~stores/stcPhotoGallery";

export const StcPhotoGalleryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { isSaveLoading } = useStcPhotoGalleryStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: deleteStcPhotoGallery } = useDeleteStcPhotoGalleryMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteStcPhotoGallery({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "Photo gallery editing" : "Photo gallery creating"}
            onBackClick={handleGoBack}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
            isLoading={isSaveLoading}
            formName='stcPhotoGalleryForm'
          />
          <StcPhotoGalleryDetailsForm id={Number(id)} lang={lang} formName='stcPhotoGalleryForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
