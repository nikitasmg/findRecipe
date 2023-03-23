import React from "react";
import { Control, UseFormGetValues } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  LinkedDocument,
  useCreateLinkedDocumentMutation,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  useLinkedDocumentsQuery
} from "~/generated/graphql";
import { LinkedDocumentForm as UiLinkedDocumentForm } from "~/shared/components/LinkedDocumentForm";

export type LinkedDocumentsFormFields = {
  documents?: LinkedDocument[];
  connectDocuments?: string[];
  disconnectDocuments?: string[];
  updateDocuments?: LinkedDocument[];
};

type Props = {
  setValue: (name: keyof LinkedDocumentsFormFields, value: LinkedDocument[] | string[]) => void;
  getValues: UseFormGetValues<LinkedDocumentsFormFields>;
  control: Control<LinkedDocumentsFormFields, unknown>;
};

export const LinkedDocumentForm: React.FC<Props> = ({ setValue, getValues, control }) => {
  const client = useGraphqlClient();

  const { data } = useLinkedDocumentsQuery(client);

  const { mutateAsync: createDocument } = useCreateLinkedDocumentMutation(client);

  const { mutateAsync: updateDocument } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: deleteDocument } = useDeleteLinkedDocumentMutation(client);

  return (
    <UiLinkedDocumentForm
      allDocuments={data?.linkedDocuments ?? []}
      create={createDocument}
      update={updateDocument}
      remove={deleteDocument}
      setValue={setValue}
      getValues={getValues}
      control={control}
    />
  );
};
