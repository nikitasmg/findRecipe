import { gql } from "graphql-request";

export const DocumentGroupsFragment = gql`
  fragment allDocumentGroupsFields on DocumentGroup {
    id
    name
    sort
    linked_documents {
      id
      sort
      user_name
      url
    }
  }
`;

export const DocumentGroupById = gql`
  ${DocumentGroupsFragment}

  query documentGroupById($id: Int!) {
    documentGroupById(id: $id) {
      ...allDocumentGroupsFields
    }
  }
`;

export const DocumentGroups = gql`
  ${DocumentGroupsFragment}

  query documentGroups($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    documentGroups(orderBy: $orderBy, filter: $filter) {
      ...allDocumentGroupsFields
    }
  }
`;

export const CreateDocumentGroup = gql`
  ${DocumentGroupsFragment}

  mutation createDocumentGroup($input: DocumentGroupInput!) {
    createDocumentGroup: upsertDocumentGroup(input: $input) {
      ...allDocumentGroupsFields
    }
  }
`;

export const UpdateDocumentGroup = gql`
  ${DocumentGroupsFragment}

  mutation updateDocumentGroup($input: DocumentGroupInput!) {
    upsertDocumentGroup(input: $input) {
      ...allDocumentGroupsFields
    }
  }
`;

export const DeleteDocumentGroup = gql`
  mutation deleteDocumentGroup($id: Int!) {
    deleteDocumentGroup(id: $id) {
      id
    }
  }
`;