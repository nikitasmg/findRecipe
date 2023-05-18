import { gql } from "graphql-request";

export const UsersFragment = gql`
  fragment allUsersFields on User {
    id
    name
    email
    email_verified_at
    created_at
    updated_at
  }
`;

export const UserById = gql`
  ${UsersFragment}

  query userById($id: Int!) {
    userById(id: $id) {
      ...allUsersFields
    }
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

export const CreateUser = gql`
  ${UsersFragment}

  mutation createUser($input: UserInput!) {
    createUser: upsertUser(input: $input) {
      ...allUsersFields
    }
  }
`;

export const UpdateUser = gql`
  ${UsersFragment}

  mutation updateUser($input: UserInput!) {
    upsertUser(input: $input) {
      ...allUsersFields
    }
  }
`;

export const DeleteUser = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
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
