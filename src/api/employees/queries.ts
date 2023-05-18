import { gql } from "graphql-request";
import { SubdivisionsFragment } from "~/api/subdivisions/queries";

export const EmployeeFragment = gql`
  ${SubdivisionsFragment}

  fragment allEmployeeFields on Employee {
    id
    name
    name_en
    email
    position
    position_en
    additional
    sort
    subdivision {
      ...allSubdivisionsFields
    }
    created_at
    updated_at
  }
`;

export const EmployeeById = gql`
  ${EmployeeFragment}

  query employeeById($id: Int!) {
    employeeById(id: $id) {
      ...allEmployeeFields
    }
  }
`;

export const Employees = gql`
  ${EmployeeFragment}

  query employees($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    employees(orderBy: $orderBy, filter: $filter) {
      ...allEmployeeFields
    }
  }
`;

export const CreateEmployee = gql`
  ${EmployeeFragment}

  mutation createEmployee($input: EmployeeInput!) {
    createEmployee: upsertEmployee(input: $input) {
      ...allEmployeeFields
    }
  }
`;

export const UpdateEmployee = gql`
  ${EmployeeFragment}

  mutation updateEmployee($input: EmployeeInput!) {
    upsertEmployee(input: $input) {
      ...allEmployeeFields
    }
  }
`;

export const UpdateEmployeeSubdivision = gql`
  mutation UpdateEmployeeSubdivision($id: Int!, $subdivisionId: Int!) {
    upsertEmployee(input: { id: $id, subdivision: { connect: $subdivisionId } }) {
      id
    }
  }
`;

export const DeleteEmployee = gql`
  mutation deleteEmployee($id: Int!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;
