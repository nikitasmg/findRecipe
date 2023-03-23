import React from "react";
import { PageForm } from "~/modules/PageForm";

type Props = {
  slug: string;
};

export const EditControlItemPageForm: React.FC<Props> = ({ slug }) => {
  return <PageForm slug={slug} />;
};
