import React from "react";
import { PageForm } from "~/modules/PageForm";

export const EditCommonPageForm: React.FC = () => {
  return <PageForm slug='common' isDocumentsExist isAdditionalTab />;
};
