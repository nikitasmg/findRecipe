import React from "react";
import { usePaths } from "~/app/providers/Paths";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PathsPanel } from "~/shared/components/PathsPanel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const Home: React.FC = () => {
  const paths = usePaths();

  return (
    <PageWrapper>
      <PageTableTitle title='Home' />
      <PathsPanel initialExpanded paths={paths} />
    </PageWrapper>
  );
};
