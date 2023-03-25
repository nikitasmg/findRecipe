import React from "react";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  DocumentGroup,
  useUpdateConnectDocumentGroupMutation,
  useUpdateDocumentGroupMutation
} from "~/generated/graphql";
import { useAlertsStore } from "~/shared/stores/alerts";
import { GroupsMap } from "../types";

export const useGroupUpdateHandler = (
  setGroups: React.Dispatch<React.SetStateAction<GroupsMap | undefined>>
) => {
  const client = useGraphqlClient();

  const { mutateAsync: updateOneGroup } = useUpdateDocumentGroupMutation(client);

  const { mutateAsync: updateTwoConnects } = useUpdateConnectDocumentGroupMutation(client);

  const addAlert = useAlertsStore((state) => state.addAlert);

  const getUpdateHandler =
    (groupId: DocumentGroup["id"]) => (document: LinkedDocumentsWithoutUpdated) => {
      if (!document.id) {
        return;
      }

      setGroups((currentGroups) => {
        const existedGroup = Object.values(currentGroups ?? {}).find((group) => {
          return (group.linked_documents ?? {})[document.id];
        });

        if (existedGroup?.id === groupId) {
          addAlert("warning", "Already exist");
          return currentGroups;
        }

        const newGroups = { ...currentGroups };

        newGroups[groupId] = {
          ...newGroups[groupId],
          linked_documents: {
            ...newGroups[groupId].linked_documents,
            [document.id]: document
          }
        };

        if (!existedGroup) {
          updateOneGroup({
            input: {
              id: groupId,
              linked_documents: {
                connect: [String(document.id)]
              }
            }
          });

          return newGroups;
        }

        updateTwoConnects({
          connectInput: {
            id: groupId,
            linked_documents: {
              connect: [String(document.id)]
            }
          },
          disconnectInput: {
            id: existedGroup.id,
            linked_documents: {
              disconnect: [String(document.id)]
            }
          }
        });

        delete newGroups[existedGroup.id].linked_documents?.[document.id];

        return newGroups;
      });
    };

  return getUpdateHandler;
};
