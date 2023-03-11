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

  query newsCategoryById($id: Int!) {
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

export const CreateNewsCategory = gql`
  ${NewsCategoriesFragment}

  mutation createNewsCategory($sort: Int!, $name: String!) {
    upsertNewsCategory(input: { sort: $sort, name: $name }) {
      ...allNewsCategoriesFields
    }
  }
`;

export const UpdateNewsCategory = gql`
  ${NewsCategoriesFragment}

  mutation updateNewsCategory($id: Int!, $sort: Int!, $name: String!) {
    upsertNewsCategory(input: { id: $id, sort: $sort, name: $name }) {
      ...allNewsCategoriesFields
    }
  }
`;

export const DeleteNewsCategory = gql`
  mutation deleteNewsCategory($id: Int!) {
    deleteNewsCategory(id: $id) {
      sort
      name
    }
  }
`;
