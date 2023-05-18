import React from "react";
import { CompilationsTable } from "~/modules/CompilationsTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";

export const Compilations: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text className='px-4'>Compilations</Text>
    </PageTitle>
    <CompilationsTable />
  </PageWrapper>
);
