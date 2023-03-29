import { gql } from "graphql-request";

export const NewsFragment = gql`
  fragment allNewsFields on News {
    id
    name
    slug
    content
    description
    imageUrl
    source
    source_name
    published
    image {
      id
      url
    }
    gallery {
      id
      url
      alt
      sort
    }
    category {
      id
      name
      sort
    }
    tags {
      id
      name
      sort
    }
    seo {
      id
      title
      description
    }
    meta {
      auto_title
      auto_description
    }
    created_at
    updated_at
    published_at
    on_index
  }
`;

export const NewsById = gql`
  ${NewsFragment}

  query newsById($id: Int!) {
    newsById(id: $id) {
      ...allNewsFields
    }
  }
`;

export const News = gql`
  ${NewsFragment}

  query news($orderBy: [OrderByClause!], $filter: [FilterByClause!], $first: Int = 30, $page: Int) {
    news(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
      paginatorInfo {
        lastPage
        total
        perPage
      }
      data {
        ...allNewsFields
      }
    }
  }
`;

export const AllNewsIds = gql`
  ${NewsFragment}

  query allNews($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    allNewsIds: news(orderBy: $orderBy, filter: $filter, first: 9999, page: 1) {
      data {
        id
      }
    }
  }
`;

export const UpdateOnIndex = gql`
  mutation UpdateOnIndex($id: Int!, $on_index: Boolean!) {
    upsertNews(input: { id: $id, on_index: $on_index }) {
      id
    }
  }
`;

export const UpdatePublishedNews = gql`
  mutation UpdatePublishedNews($id: Int!, $published: Boolean!) {
    upsertNews(input: { id: $id, published: $published }) {
      id
    }
  }
`;

export const CreateNews = gql`
  ${NewsFragment}

  mutation createNews($input: NewsInput!) {
    createNews: upsertNews(input: $input) {
      ...allNewsFields
    }
  }
`;

export const UpdateNews = gql`
  ${NewsFragment}

  mutation updateNews($input: NewsInput!) {
    upsertNews(input: $input) {
      ...allNewsFields
    }
  }
`;

export const DeleteNews = gql`
  mutation deleteNews($id: Int!) {
    deleteNews(id: $id) {
      id
    }
  }
`;
