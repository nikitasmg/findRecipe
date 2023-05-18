import React from "react";
import { StcPhotoGalleryTable } from "~/modules/StcPhotoGalleryTable";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { useStcPhotoGalleryStore } from "~stores/stcPhotoGallery";

export const StcPhotoGallery: React.FC = () => {
  const { count, isLoading } = useStcPhotoGalleryStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Photo gallery'
        sitePath='ntc-in-surgut'
        count={count}
        isLoading={isLoading}
      />
      <StcPhotoGalleryTable />
    </PageWrapper>
  );
};
