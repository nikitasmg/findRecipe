import { gql } from "graphql-request";

export const NewsCategoriesFragment = gql`
  fragment allNewsCategoriesFields on NewsCategory {
    id
    sort
    name
  }
`;

export const NewsCategoryById = gql`
  ${NewsCategoriesFragment}

  query newsCategoryById($id: ID!) {
    newsCategoryById(id: $id) {
      ...allNewsCategoriesFields
    }
  }
`;

export const NewsCategories = gql`
  ${NewsCategoriesFragment}

  query newsCategories($orderBy: [OrderByClause!]) {
    newsCategories(orderBy: $orderBy) {
      ...allNewsCategoriesFields
    }
  }
`;
