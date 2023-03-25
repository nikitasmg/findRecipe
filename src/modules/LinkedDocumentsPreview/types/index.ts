import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { DocumentGroup } from "~/generated/graphql";

export type LinkedDocumentsMap = Record<
  LinkedDocumentsWithoutUpdated["id"],
  LinkedDocumentsWithoutUpdated
>;

export type GroupsMap = Record<
  DocumentGroup["id"],
  Omit<DocumentGroup, "linked_documents"> & {
    linked_documents?: LinkedDocumentsMap;
  }
>;
