import { gql } from "graphql-request";

export const NewsFragment = gql`
  fragment allNewsFields on News {
    id
    name
    slug
    content
    description
    published_at
    imageUrl
    image {
      id
      url
    }
    imageThumbs {
      name
      method
    }
    created_at
    updated_at
  }
`;

export const NewsById = gql`
  ${NewsFragment}

  query newsById($id: ID!) {
    newsById(email: $email) {
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
