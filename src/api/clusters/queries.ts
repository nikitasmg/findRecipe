import { gql } from "graphql-request";

export const clustersFragment = gql`
  fragment allClustersFields on Cluster {
    id
    name
    column_one_name
    column_one_text
    column_two_name
    column_two_text
    sort
    created_at
    updated_at
  }
`;

export const ClusterById = gql`
  ${clustersFragment}

  query clusterById($id: Int!) {
    clusterById(id: $id) {
      ...allClustersFields
    }
  }
`;

export const Clusters = gql`
  ${clustersFragment}

  query clusters($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    clusters(orderBy: $orderBy, filter: $filter) {
      ...allClustersFields
    }
  }
`;

export const CreateCluster = gql`
  ${clustersFragment}

  mutation createCluster($input: ClusterInput!) {
    createCluster: upsertCluster(input: $input) {
      ...allClustersFields
    }
  }
`;

export const UpdateCluster = gql`
  ${clustersFragment}

  mutation updateCluster($input: ClusterInput!) {
    upsertCluster(input: $input) {
      ...allClustersFields
    }
  }
`;

export const DeleteCluster = gql`
  mutation deleteCluster($id: Int!) {
    deleteCluster(id: $id) {
      id
    }
  }
`;
