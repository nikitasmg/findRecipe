import React from "react";
import { BlocksContests } from "~/modules/BlocksContests";
import { PageForm } from "~/modules/PageForm";

export const EditContestsPageForm: React.FC = () => {
  return (
    <PageForm
      slug='contests'
      isDocumentsExist
      render={(form, lang) => (
        <BlocksContests lang={lang} setValue={form.setValue} control={form.control} />
      )}
    />
  );
};
