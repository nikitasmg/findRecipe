import { gql } from "graphql-request";

export const UsersFragment = gql`
  fragment allUsersFields on User {
    id
    name
    email
    email_verified_at
  }
`;

export const Users = gql`
  ${UsersFragment}

  query users(
    $orderBy: [OrderByClause!]
    $filter: [FilterByClause!]
    $first: Int = 30
    $page: Int
  ) {
    users(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
      paginatorInfo {
        lastPage
        total
        perPage
      }
      data {
        ...allUsersFields
      }
    }
  }
`;

export const Profile = gql`
  ${UsersFragment}

  query me {
    me {
      ...allUsersFields
    }
  }
`;
