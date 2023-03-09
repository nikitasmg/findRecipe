import React from "react";
import { InteractiveMapForm } from "~/modules/InteractiveMapForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { Panel } from "~/shared/components/Panel";

export const InteractiveMap: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4'>Interactive map</Text>
      </PageTitle>
      <Panel>
        <InteractiveMapForm />
      </Panel>
    </PageWrapper>
  );
};