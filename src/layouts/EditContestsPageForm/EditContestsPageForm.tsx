import React from "react";
import { ContestsBlocks } from "~/modules/ContestsBlocks";
import { PageForm } from "~/modules/PageForm";

export const EditContestsPageForm: React.FC = () => {
  return (
    <PageForm
      slug='contests'
      isDocumentsExist
      render={(form) => <ContestsBlocks setValue={form.setValue} control={form.control} />}
    />
  );
};
