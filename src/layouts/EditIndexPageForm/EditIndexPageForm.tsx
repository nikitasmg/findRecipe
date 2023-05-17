import React from "react";
import { BlocksIndexPage } from "~/modules/BlocksIndexPage";
import { PageForm } from "~/modules/PageForm";

export const EditIndexPageForm: React.FC = () => {
  return (
    <PageForm
      slug='home'
      isInfoBlockCards
      render={(form, lang) => <BlocksIndexPage {...form} lang={lang} />}
    />
  );
};
