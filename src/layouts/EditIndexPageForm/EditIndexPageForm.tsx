import React from "react";
import { BlocksIndexPage } from "~/modules/BlocksIndexPage";
import { PageForm } from "~/modules/PageForm";

export const EditIndexPageForm: React.FC = () => {
  return <PageForm slug='index' render={(form) => <BlocksIndexPage {...form} />} />;
};
