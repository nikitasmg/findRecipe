import { gql } from "graphql-request";

export const videoBroadcastsFragment = gql`
  fragment allVideoBroadcastsFields on VideoBroadcast {
    id
    name
    name_en
    sort
    url
  }
`;

export const VideoBroadcastById = gql`
  ${videoBroadcastsFragment}

  query videoBroadcastById($id: Int!) {
    videoBroadcastById(id: $id) {
      ...allVideoBroadcastsFields
    }
  }
`;

export const VideoBroadcasts = gql`
  ${videoBroadcastsFragment}

  query videoBroadcasts($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    videoBroadcasts(orderBy: $orderBy, filter: $filter) {
      ...allVideoBroadcastsFields
    }
  }
`;

export const CreateVideoBroadcast = gql`
  ${videoBroadcastsFragment}

  mutation createVideoBroadcast($input: VideoBroadcastInput!) {
    createVideoBroadcast: upsertVideoBroadcast(input: $input) {
      ...allVideoBroadcastsFields
    }
  }
`;

export const UpdateVideoBroadcast = gql`
  ${videoBroadcastsFragment}

  mutation updateVideoBroadcast($input: VideoBroadcastInput!) {
    upsertVideoBroadcast(input: $input) {
      ...allVideoBroadcastsFields
    }
  }
`;

export const DeleteVideoBroadcast = gql`
  mutation deleteVideoBroadcast($id: Int!) {
    deleteVideoBroadcast(id: $id) {
      id
    }
  }
`;
