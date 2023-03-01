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
    created_at
    updated_at
    published_at
    on_index
  }
`;

export const NewsById = gql`
  ${NewsFragment}

  query newsById($id: ID!) {
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

export const UpdateOnIndex = gql`
  mutation UpdateOnIndex($id: ID!, $on_index: Boolean!) {
    upsertNews(input: { id: $id, on_index: $on_index }) {
      id
    }
  }
`;

export const CreateNews = gql`
  ${NewsFragment}

  mutation createNews($input: NewsInput!) {
    upsertNews(input: $input) {
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

  mutation updateNews2($input: NewsInput!) {
    upsertNews(input: $input) {
      ...allNewsFields
    }
  }
`;
