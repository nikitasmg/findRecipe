import React from "react";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useProjectsStore } from "~stores/projects";
import { ProjectsTable } from "~/modules/ProjectsTable";

export const Projects: React.FC = () => {
  const { count, isLoading } = useProjectsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Projects'
        isLoading={isLoading}
        count={count}
        sitePath='grants/projects'
      />
      <ProjectsTable />
    </PageWrapper>
  );
};
