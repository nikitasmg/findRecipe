import { gql } from "graphql-request";

export const StaffControlFragment = gql`
  fragment allFields on StaffControl {
    id
    name
    name_en
    description
    description_en
    email
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

  query staffControlById($id: Int!) {
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
    createStaffControl: upsertStaffControl(input: $input) {
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
  mutation deleteStaffControl($id: Int!) {
    deleteStaffControl(id: $id) {
      id
    }
  }
`;

export const StaffControlPages = gql`
  query staffControlItems {
    pages(filter: [{ column: "slug", value: "control" }]) {
      name
      children {
        name
        id
      }
    }
  }
`;
