import { gql } from "graphql-request";

export const video360Fragment = gql`
  fragment allVideo360Fields on Video360 {
    id
    name
    name_en
    description
    description_en
    sort
    url
  }
`;

export const Video360ById = gql`
  ${video360Fragment}

  query video360ById($id: Int!) {
    video360ById(id: $id) {
      ...allVideo360Fields
    }
  }
`;

export const Video360 = gql`
  ${video360Fragment}

  query video360($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    video360(orderBy: $orderBy, filter: $filter) {
      ...allVideo360Fields
    }
  }
`;

export const CreateVideo360 = gql`
  ${video360Fragment}

  mutation createVideo360($input: Video360Input!) {
    createVideo360: upsertVideo360(input: $input) {
      ...allVideo360Fields
    }
  }
`;

export const UpdateVideo360 = gql`
  ${video360Fragment}

  mutation updateVideo360($input: Video360Input!) {
    upsertVideo360(input: $input) {
      ...allVideo360Fields
    }
  }
`;

export const DeleteVideo360 = gql`
  mutation deleteVideo360($id: Int!) {
    deleteVideo360(id: $id) {
      id
    }
  }
`;
