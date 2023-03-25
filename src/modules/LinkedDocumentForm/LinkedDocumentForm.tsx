import React, { useMemo, useState } from "react";
import { Control, UseFormGetValues } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  useCreateLinkedDocumentMutation,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  useLinkedDocumentsQuery,
  useDocumentGroupsQuery,
  useUpdateDocumentGroupMutation,
  DocumentGroupInput,
  DocumentGroup
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { LinkedDocumentForm as UiLinkedDocumentForm } from "~/shared/components/LinkedDocumentForm";

export type LinkedDocumentsFormFields = {
  documents?: LinkedDocumentsWithoutUpdated[];
  connectDocuments?: string[];
  disconnectDocuments?: string[];
  updateDocuments?: LinkedDocumentsWithoutUpdated[];
};

type Props = {
  setValue: (
    name: keyof LinkedDocumentsFormFields,
    value: LinkedDocumentsWithoutUpdated[] | string[]
  ) => void;
  getValues: UseFormGetValues<LinkedDocumentsFormFields>;
  control: Control<LinkedDocumentsFormFields, unknown>;
};

export const LinkedDocumentForm: React.FC<Props> = ({ setValue, getValues, control }) => {
  const [activeGroupId, setActiveGroupId] = useState<DocumentGroup["id"]>();

  const client = useGraphqlClient();

  const { data } = useLinkedDocumentsQuery(client);

  const { mutateAsync: createDocument } = useCreateLinkedDocumentMutation(client);

  const { mutateAsync: updateDocument } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: deleteDocument } = useDeleteLinkedDocumentMutation(client);

  const { mutateAsync: updateGroup } = useUpdateDocumentGroupMutation(client);

  const { data: groupData, refetch } = useDocumentGroupsQuery(
    client,
    {},
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const groups = useMemo(() => groupData?.documentGroups ?? [], [groupData]);

  const handleChangeData = (document?: LinkedDocumentsWithoutUpdated | null) => {
    if (!document) {
      setActiveGroupId(undefined);
    }
    const newActiveGroup = groups.find((group) => {
      return group.linked_documents?.find((doc) => doc?.id === document?.id);
    });

    if (newActiveGroup) {
      setActiveGroupId(newActiveGroup?.id);
    }
  };

  const onGroupUpdate = (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => {
    updateGroup({ input }).then(() => refetch());
  };

  return (
    <UiLinkedDocumentForm
      groups={groups}
      onGroupUpdate={onGroupUpdate}
      groupId={activeGroupId}
      allDocuments={data?.linkedDocuments ?? []}
      create={createDocument}
      update={updateDocument}
      remove={deleteDocument}
      setValue={setValue}
      getValues={getValues}
      control={control}
      onActiveChange={handleChangeData}
    />
  );
};
