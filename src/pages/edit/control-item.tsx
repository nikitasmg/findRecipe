import React from "react";
import { EditControlItemPageForm } from "~/layouts/EditControlItemPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

type Props = {
  title: string;
  slug: string;
};

export const EditControlItemPage: React.FC<Props> = ({ title, slug }) => (
  <PageWrapper>
    <PageTableTitle title={title} sitePath={`about/control/${slug}`} />
    <Panel>
      <EditControlItemPageForm slug={slug} />
    </Panel>
  </PageWrapper>
);
