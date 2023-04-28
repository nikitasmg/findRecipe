import { gql } from "graphql-request";

export const PageCardFragment = gql`
  fragment allPageCardFields on PageCard {
    id
    name
    name_en
    description
    description_en
    url_name
    url_name_en
    route
    sort
    image {
        id
        url
    }
    imageUrl
  }
`;

export const pageCardByIdById = gql`
  ${PageCardFragment}

  query pageCardById($id: Int!) {
    pageCardById(id: $id) {
      ...allPageCardFields
    }
  }
`;

export const pageCards = gql`
  ${PageCardFragment}

  query pageCards($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    pageCards(orderBy: $orderBy, filter: $filter) {
      ...allPageCardFields
    }
  }
`;

export const CreatePageCard = gql`
  ${PageCardFragment}

  mutation createPageCard($input: PageCardInput!) {
    createPageCard: upsertPageCard(input: $input) {
      ...allPageCardFields
    }
  }
`;

export const UpdatePageCard = gql`
  ${PageCardFragment}

  mutation updatePageCard($input: PageCardInput!) {
    upsertPageCard(input: $input) {
      ...allPageCardFields
    }
  }
`;

export const DeletePageCard = gql`
  mutation deletePageCard($id: Int!) {
    deletePageCard(id: $id) {
      id
    }
  }
`;
