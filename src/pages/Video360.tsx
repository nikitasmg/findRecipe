import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Video360Table } from "~/modules/Video360Table";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { useVideo360Store } from "~stores/video360";

export const Video360: React.FC = () => {
  const { count, isLoading } = useVideo360Store((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Video 360'
        sitePath='ntc-in-surgut'
        count={count}
        isLoading={isLoading}
      />
      <Video360Table />
    </PageWrapper>
  );
};
