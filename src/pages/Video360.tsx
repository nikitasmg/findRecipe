import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { Video360Table } from "~/modules/Video360Table";

export const Video360: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Video 360
        </Text>
      </PageTitle>
      <Video360Table />
    </PageWrapper>
  );
};
