import React from "react";
import { usePaths } from "~/app/providers/Paths";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PathsPanel } from "~/shared/components/PathsPanel";
import { Text } from "~/shared/components/Text";

export const Home: React.FC = () => {
  const paths = usePaths();

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4'>Home</Text>
      </PageTitle>
      <PathsPanel initialExpanded paths={paths} />
    </PageWrapper>
  );
};
