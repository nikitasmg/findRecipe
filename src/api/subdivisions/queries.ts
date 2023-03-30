import { gql } from "graphql-request";

export const SubdivisionsFragment = gql`
  fragment allSubdivisionsFields on Subdivision {
    id
    name
    name_en
    sort
  }
`;

export const SubdivisionById = gql`
  ${SubdivisionsFragment}

  query subdivisionById($id: Int!) {
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

  mutation createSubdivision($sort: Int!, $name: String!, $name_en: String) {
    createSubdivision: upsertSubdivision(input: { sort: $sort, name: $name, name_en: $name_en }) {
      ...allSubdivisionsFields
    }
  }
`;

export const UpdateSubdivision = gql`
  ${SubdivisionsFragment}

  mutation updateSubdivision($id: Int!, $sort: Int!, $name: String!, $name_en: String) {
    upsertSubdivision(input: { id: $id, sort: $sort, name: $name, name_en: $name_en }) {
      ...allSubdivisionsFields
    }
  }
`;

export const DeleteSubdivision = gql`
  mutation deleteSubdivision($id: Int!) {
    deleteSubdivision(id: $id) {
      sort
      name
    }
  }
`;
