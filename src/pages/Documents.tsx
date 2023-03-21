import React from "react";
import { LinkedDocumentsPreview } from "~/modules/LinkedDocumentsPreview";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { useDocumentsStore } from "~/shared/stores/documents";

export const Documents: React.FC = () => {
  const { count, isLoading } = useDocumentsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Documents'
        countTitle='count documents'
        isLoading={isLoading}
        count={count}
      />
      <Panel>
        <LinkedDocumentsPreview />
      </Panel>
    </PageWrapper>
  );
};
