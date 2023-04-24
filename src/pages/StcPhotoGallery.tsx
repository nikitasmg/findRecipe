import React from "react";
import { StcPhotoGalleryTable } from "~/modules/StcPhotoGalleryTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";

export const StcPhotoGallery: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Photo gallery
        </Text>
      </PageTitle>
      <StcPhotoGalleryTable />
    </PageWrapper>
  );
};
