import React from "react";
import { EditControlItemPageForm } from "~/modules/EditControlItemPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

type Props = {
  title: string;
  slug: string;
};

export const EditControlItemPage: React.FC<Props> = ({ title, slug }) => (
  <PageWrapper>
    <PageTitle>
      <Text>{title}</Text>
    </PageTitle>
    <Panel>
      <EditControlItemPageForm slug={slug} />
    </Panel>
  </PageWrapper>
);
