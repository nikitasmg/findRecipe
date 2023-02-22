import { gql } from "graphql-request";

export const NewsTagsFragment = gql`
  fragment allNewsTagsFields on NewsTag {
    id
    sort
    name
  }
`;

export const NewsCategoryById = gql`
  ${NewsTagsFragment}

  query newsTagById($id: ID!) {
    newsTagById(id: $id) {
      ...allNewsTagsFields
    }
  }
`;

export const NewsCategories = gql`
  ${NewsTagsFragment}

  query newsTags($orderBy: [OrderByClause!]) {
    newsTags(orderBy: $orderBy) {
      ...allNewsTagsFields
    }
  }
`;
