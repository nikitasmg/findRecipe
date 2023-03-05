import { gql } from "graphql-request";

export const SubdivisionsFragment = gql`
  fragment allSubdivisionsFields on Subdivision {
    id
    name
    sort
  }
`;

export const SubdivisionById = gql`
  ${SubdivisionsFragment}

  query subdivisionById($id: ID!) {
    subdivisionById(id: $id) {
      ...allSubdivisionsFields
    }
  }
`;

export const Subdivisions = gql`
  ${SubdivisionsFragment}

  query subdivisions($orderBy: [OrderByClause!]) {
    subdivisions(orderBy: $orderBy) {
      ...allSubdivisionsFields
    }
  }
`;

export const CreateSubdivision = gql`
  ${SubdivisionsFragment}

  mutation createSubdivision($sort: Int!, $name: String!) {
    upsertSubdivision(input: { sort: $sort, name: $name }) {
      ...allSubdivisionsFields
    }
  }
`;

export const UpdateSubdivision = gql`
  ${SubdivisionsFragment}

  mutation updateSubdivision($id: ID!, $sort: Int!, $name: String!) {
    upsertSubdivision(input: { id: $id, sort: $sort, name: $name }) {
      ...allSubdivisionsFields
    }
  }
`;

export const DeleteSubdivision = gql`
  mutation deleteSubdivision($id: ID!) {
    deleteSubdivision(id: $id) {
      sort
      name
    }
  }
`;
