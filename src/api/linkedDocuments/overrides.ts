import { LinkedDocument } from "~/generated/graphql";

export type LinkedDocumentsWithoutUpdated = Omit<LinkedDocument, "updated_at">;
