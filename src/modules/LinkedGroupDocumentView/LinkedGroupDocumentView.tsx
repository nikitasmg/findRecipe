import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  DocumentGroup,
  useDocumentGroupByIdQuery,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  useCreateLinkedDocumentMutation,
  useUpdateDocumentGroupMutation,
  DocumentGroupInput,
  useLinkedDocumentsQuery,
  useDocumentGroupsQuery
} from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import {
  LinkedDocumentForm,
  LinkedDocumentsFormFields
} from "~/shared/components/LinkedDocumentForm";

type Props = {
  groupId: DocumentGroup["id"];
};

export const LinkedDocumentView: React.FC<Props> = ({ groupId }) => {
  const form = useForm<LinkedDocumentsFormFields>();

  const client = useGraphqlClient();

  const { data } = useDocumentGroupByIdQuery(
    client,
    { id: groupId },
    { enabled: !!groupId, refetchOnMount: "always" }
  );

  const { data: allData } = useLinkedDocumentsQuery(client);

  const { mutateAsync: update } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: remove } = useDeleteLinkedDocumentMutation(client);

  const { mutateAsync: create } = useCreateLinkedDocumentMutation(client);

  const { mutateAsync: updateGroup } = useUpdateDocumentGroupMutation(client);

  const { data: groupsData, refetch } = useDocumentGroupsQuery(
    client,
    {},
    { refetchOnMount: "always" }
  );

  const { mutateAsync: resort } = useResort("upsertDocumentGroup");

  const groups = groupsData?.documentGroups ?? [];

  const onGroupUpdate = (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => {
    updateGroup({ input }).then(() => refetch());
  };

  const onAddDocuments = (ids: LinkedDocumentsWithoutUpdated["id"][]) => {
    const input: DocumentGroupInput = {
      id: groupId,
      linked_documents: {
        connect: ids.map(String)
      }
    };
    updateGroup({ input });
  };

  const onRemoveDocument = (id: LinkedDocumentsWithoutUpdated["id"]) => {
    const input: DocumentGroupInput = {
      id: groupId,
      linked_documents: {
        disconnect: [String(id)]
      }
    };
    updateGroup({ input });
  };

  useEffect(() => {
    const group = data?.documentGroupById;
    const documents: LinkedDocumentsWithoutUpdated[] =
      (group?.linked_documents as LinkedDocumentsWithoutUpdated[]) ?? [];

    form.setValue("documents", documents);
  }, [form, data]);

  return (
    <LinkedDocumentForm
      create={create}
      update={update}
      remove={remove}
      {...form}
      groups={groups}
      onGroupUpdate={onGroupUpdate}
      groupId={groupId}
      allDocuments={allData?.linkedDocuments ?? []}
      onAddDocuments={onAddDocuments}
      onRemoveDocument={onRemoveDocument}
      onResort={resort}
    />
  );
};
