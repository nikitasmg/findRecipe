import React from "react";
import { CompilationsTable } from "~/modules/CompilationsTable";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const Compilations: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Compilations' />
    <CompilationsTable />
  </PageWrapper>
);
