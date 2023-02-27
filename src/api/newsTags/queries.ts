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

export const CreateNewsTag = gql`
  ${NewsTagsFragment}

  mutation createNewsTag($sort: Int!, $name: String!) {
    upsertNewsTag(input: { sort: $sort, name: $name }) {
      ...allNewsTagsFields
    }
  }
`;

export const UpdateNewsTag = gql`
  ${NewsTagsFragment}

  mutation updateNewsTag($id: ID!, $sort: Int!, $name: String!) {
    upsertNewsTag(input: { id: $id, sort: $sort, name: $name }) {
      ...allNewsTagsFields
    }
  }
`;

export const DeleteNewsTag = gql`
  mutation deleteNewsTag($id: ID!) {
    deleteNewsTag(id: $id) {
      sort
      name
    }
  }
`;
