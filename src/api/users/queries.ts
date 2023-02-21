import { gql } from "graphql-request";

export const UsersFragment = gql`
  fragment allUsersFields on User {
    id
    role
    name
    email
    email_verified_at
  }
`;

export const Users = gql`
  ${UsersFragment}

  query users($name: String, $first: Int = 10, $page: Int) {
    users(name: $name, first: $first, page: $page) {
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
