// eslint-disable-next-line no-comments/disallowComments
/* eslint-disable no-secrets/no-secrets */
import { gql } from "graphql-request";

export const LinkedDocumentsFragment = gql`
  fragment allLinkedDocumentFields on LinkedDocument {
    id
    url
    user_name
    sort
  }
`;

export const LinkedDocumentById = gql`
  ${LinkedDocumentsFragment}

  query linkedDocumentById($id: Int!) {
    linkedDocumentById(id: $id) {
      ...allLinkedDocumentFields
    }
  }
`;

export const LinkedDocuments = gql`
  ${LinkedDocumentsFragment}

  query linkedDocuments($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    linkedDocuments(orderBy: $orderBy, filter: $filter) {
      ...allLinkedDocumentFields
    }
  }
`;

export const CreateLinkedDocument = gql`
  ${LinkedDocumentsFragment}

  mutation createLinkedDocument($input: LinkedDocumentInput!) {
    createLinkedDocument: upsertLinkedDocument(input: $input) {
      ...allLinkedDocumentFields
    }
  }
`;

export const UpdateLinkedDocument = gql`
  ${LinkedDocumentsFragment}

  mutation updateLinkedDocument($input: LinkedDocumentInput!) {
    upsertLinkedDocument(input: $input) {
      ...allLinkedDocumentFields
    }
  }
`;

export const DeleteLinkedDocument = gql`
  mutation deleteLinkedDocument($id: Int!) {
    deleteLinkedDocument(id: $id) {
      id
    }
  }
`;
