import { gql } from "graphql-request";

export const StaffControlFragment = gql`
  fragment allFields on StaffControl {
    id
    name
    description
    sort
    page_id
    imageUrl
    image {
      id
      url
    }
    created_at
  }
`;

export const StaffControlById = gql`
  ${StaffControlFragment}

  query staffControlById($id: ID!) {
    staffControlById(id: $id) {
      ...allFields
    }
  }
`;

export const StaffControls = gql`
  ${StaffControlFragment}

  query staffControls($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    staffControls(orderBy: $orderBy, filter: $filter) {
      ...allFields
    }
  }
`;

export const CreateStaffControl = gql`
  ${StaffControlFragment}

  mutation createStaffControl($input: StaffControlInput!) {
    upsertStaffControl(input: $input) {
      ...allFields
    }
  }
`;

export const UpdateStaffControl = gql`
  ${StaffControlFragment}

  mutation updateStaffControl($input: StaffControlInput!) {
    upsertStaffControl(input: $input) {
      ...allFields
    }
  }
`;

export const DeleteStaffControl = gql`
  mutation deleteControl($id: ID!) {
    deleteControl(id: $id) {
      id
    }
  }
`;

export const StaffControlPagesBySlug = gql`
  query staffControlPagesBySlug {
    popechitelskiy: pageBySlug(slug: "popechitelskiy-sovet") {
      id
    }
    nablyudatelnyy: pageBySlug(slug: "nablyudatelnyy-sovet") {
      id
    }
    direktor: pageBySlug(slug: "generalnyy-direktor") {
      id
    }
    apparat: pageBySlug(slug: "apparat-upravleniya") {
      id
    }
    konsultacionnyy: pageBySlug(slug: "nauchno-konsultacionnyy-sovet") {
      id
    }
  }
`;
