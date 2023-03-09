import { gql } from "graphql-request";

export const PagesFragment = gql`
  fragment allPageFields on Page {
    id
    name
    slug
    sort
    description
    imageUrl
    image {
      id
      url
    }
    parent_id
    created_at
    updated_at
  }
`;

export const PageById = gql`
  ${PagesFragment}

  query pageById($id: ID!) {
    pageById(id: $id) {
      ...allPageFields
    }
  }
`;

export const PageBySlug = gql`
  ${PagesFragment}

  query pageBySlug($slug: String!) {
    pageBySlug(slug: $slug) {
      ...allPageFields
    }
  }
`;

export const Pages = gql`
  ${PagesFragment}

  query pages($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    pages(orderBy: $orderBy, filter: $filter) {
      id
      name
      description
      imageUrl
      slug
    }
  }
`;

export const UpdatePage = gql`
  ${PagesFragment}

  mutation updatePage($input: PageInput!) {
    upsertPage(input: $input) {
      ...allPageFields
    }
  }
`;