import { gql } from "graphql-request";

export const ReportsFragment = gql`
  fragment allReportsFields on Report {
    id
    name
    description
    sort
    imageUrl
    linked_documents {
      id
      url
      user_name
      sort
    }
    created_at
  }
`;

export const ReportById = gql`
  ${ReportsFragment}

  query reportById($id: Int!) {
    reportById(id: $id) {
      ...allReportsFields
    }
  }
`;

export const Reports = gql`
  ${ReportsFragment}

  query reports($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    reports(orderBy: $orderBy, filter: $filter) {
      ...allReportsFields
    }
  }
`;

export const CreateReport = gql`
  ${ReportsFragment}

  mutation createReport($input: ReportInput!) {
    createReport: upsertReport(input: $input) {
      ...allReportsFields
    }
  }
`;

export const UpdateReport = gql`
  ${ReportsFragment}

  mutation updateReport($input: ReportInput!) {
    upsertReport(input: $input) {
      ...allReportsFields
    }
  }
`;

export const DeleteReport = gql`
  mutation deleteReport($id: Int!) {
    deleteReport(id: $id) {
      id
    }
  }
`;
