import { gql } from "graphql-request";

export const ActivityResultsFragment = gql`
  fragment allActivityResultsFields on ActivityResult {
    id
    name
    name_en
    result
    measure_unit
    measure_unit_en
    sort
    created_at
  }
`;

export const ActivityResultById = gql`
  ${ActivityResultsFragment}

  query activityResultById($id: Int!) {
    activityResultById(id: $id) {
      ...allActivityResultsFields
    }
  }
`;

export const ActivityResults = gql`
  ${ActivityResultsFragment}

  query activityResults($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    activityResults(orderBy: $orderBy, filter: $filter) {
      ...allActivityResultsFields
    }
  }
`;

export const CreateActivityResult = gql`
  ${ActivityResultsFragment}

  mutation createActivityResult($input: ActivityResultInput!) {
    createActivityResult: upsertActivityResult(input: $input) {
      ...allActivityResultsFields
    }
  }
`;

export const UpdateActivityResult = gql`
  ${ActivityResultsFragment}

  mutation updateActivityResult($input: ActivityResultInput!) {
    upsertActivityResult(input: $input) {
      ...allActivityResultsFields
    }
  }
`;

export const DeleteActivityResult = gql`
  mutation deleteActivityResult($id: Int!) {
    deleteActivityResult(id: $id) {
      id
    }
  }
`;
