import React from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";
import { CompilationEditTable } from "~/modules/CompilationEditTable";
import { PageWrapper } from "~/shared/components/PageWrapper";

export const CompilationsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4'>Compilations edit</Text>
      </PageTitle>
      <CompilationEditTable id={Number(id) - 1} />
    </PageWrapper>
  );
};
