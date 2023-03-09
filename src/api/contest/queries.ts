import { gql } from "graphql-request";

export const ContestFragment = gql`
  fragment allContestFields on Contest {
    id
    name
    number
    status
    deadline
    date
    created_at
  }
`;

export const ContestById = gql`
  ${ContestFragment}

  query contestById($id: ID!) {
    contestById(id: $id) {
      ...allContestFields
    }
  }
`;

export const Contest = gql`
  ${ContestFragment}

  query contests(
    $orderBy: [OrderByClause!]
    $filter: [FilterByClause!]
    $first: Int = 30
    $page: Int
    $status: ContestStatus
  ) {
    contests(orderBy: $orderBy, filter: $filter, first: $first, page: $page, status: $status) {
      paginatorInfo {
        lastPage
        total
        perPage
      }
      data {
        ...allContestFields
      }
    }
  }
`;

export const CreateContest = gql`
  ${ContestFragment}

  mutation createContest($input: ContestInput!) {
    upsertContest(input: $input) {
      ...allContestFields
    }
  }
`;

export const UpdateContest = gql`
  ${ContestFragment}

  mutation updateContest($input: ContestInput!) {
    upsertContest(input: $input) {
      ...allContestFields
    }
  }
`;

export const DeleteContest = gql`
  mutation deleteContest($id: ID!) {
    deleteContest(id: $id) {
      id
    }
  }
`;