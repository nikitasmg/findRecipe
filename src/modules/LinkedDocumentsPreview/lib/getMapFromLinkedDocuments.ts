import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { LinkedDocumentsMap } from "../types";

export const getMapFromLinkedDocuments = <T extends LinkedDocumentsWithoutUpdated | null>(
  linked_documents?: T[] | null
) => {
  return linked_documents?.reduce((map: LinkedDocumentsMap, cur) => {
    if (cur) {
      map[cur.id] = cur;
    }

    return map;
  }, Object.create(null));
};
