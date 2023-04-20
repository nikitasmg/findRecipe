import React from "react";
import { PageForm } from "~/modules/PageForm";

export const EditNtcInSurgutPageForm: React.FC = () => {
  return (
    <PageForm
      slug='ntc-in-surgut'
      isDocumentsExist
      isStcTechnologiesSection
      isAboutProject
      isVideoPresentation
    />
  );
};
