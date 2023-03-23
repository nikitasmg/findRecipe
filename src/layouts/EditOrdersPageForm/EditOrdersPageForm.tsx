import React from "react";
import { PageForm } from "~/modules/PageForm";

export const EditOrdersPageForm: React.FC = () => {
  return <PageForm slug='orders' isDocumentsExist />;
};
