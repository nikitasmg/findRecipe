import { gql } from "graphql-request";

export const PurchasesFragment = gql`
  fragment allPurchasesFields on Purchase {
    id
    name
    description
    url
    sort
    published
    created_at
    updated_at
  }
`;

export const PurchaseById = gql`
  ${PurchasesFragment}

  query purchaseById($id: Int!) {
    purchaseById(id: $id) {
      ...allPurchasesFields
    }
  }
`;

export const Purchases = gql`
  ${PurchasesFragment}

  query purchases($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    purchases(orderBy: $orderBy, filter: $filter) {
      ...allPurchasesFields
    }
  }
`;

export const UpdatePurchasePublished = gql`
  mutation updatePurchasePublished($id: Int!, $published: Boolean!) {
    upsertPurchase(input: { id: $id, published: $published }) {
      id
    }
  }
`;

export const CreatePurchase = gql`
  ${PurchasesFragment}

  mutation createPurchase($input: PurchaseInput!) {
    createPurchase: upsertPurchase(input: $input) {
      ...allPurchasesFields
    }
  }
`;

export const UpdatePurchase = gql`
  ${PurchasesFragment}

  mutation updatePurchase($input: PurchaseInput!) {
    upsertPurchase(input: $input) {
      ...allPurchasesFields
    }
  }
`;

export const DeletePurchase = gql`
  mutation deletePurchase($id: Int!) {
    deletePurchase(id: $id) {
      id
    }
  }
`;
