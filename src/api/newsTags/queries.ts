import { gql } from "graphql-request";

export const NewsTagsFragment = gql`
  fragment allNewsTagsFields on NewsTag {
    id
    sort
    name
    name_en
  }
`;

export const NewsCategoryById = gql`
  ${NewsTagsFragment}

  query newsTagById($id: Int!) {
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

  mutation createNewsTag($sort: Int!, $name: String!, $name_en: String) {
    createNewsTag: upsertNewsTag(input: { sort: $sort, name: $name, name_en: $name_en }) {
      ...allNewsTagsFields
    }
  }
`;

export const UpdateNewsTag = gql`
  ${NewsTagsFragment}

  mutation updateNewsTag($id: Int!, $sort: Int!, $name: String!, $name_en: String) {
    upsertNewsTag(input: { id: $id, sort: $sort, name: $name, name_en: $name_en }) {
      ...allNewsTagsFields
    }
  }
`;

export const DeleteNewsTag = gql`
  mutation deleteNewsTag($id: Int!) {
    deleteNewsTag(id: $id) {
      sort
      name
    }
  }
`;
