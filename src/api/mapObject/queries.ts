import { gql } from "graphql-request";

export const MapObjectsFragment = gql`
  fragment allMapObjectsFields on MapObject {
    id
    name
    characteristics
    area
    gross_boma_area
    floors
    learn_more
    linked_documents {
      id
      url
      user_name
      sort
    }
    created_at
    updated_at
  }
`;

export const MapObjectById = gql`
  ${MapObjectsFragment}

  query mapObjectById($id: Int!) {
    mapObjectById(id: $id) {
      ...allMapObjectsFields
    }
  }
`;

export const MapObjects = gql`
  ${MapObjectsFragment}

  query mapObjects($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    mapObjects(orderBy: $orderBy, filter: $filter) {
      ...allMapObjectsFields
    }
  }
`;

export const UpdateMapObject = gql`
  ${MapObjectsFragment}

  mutation updateMapObject($input: MapObjectInput!) {
    upsertMapObject(input: $input) {
      ...allMapObjectsFields
    }
  }
`;

export const DeleteMapObject = gql`
  mutation deleteMapObject($id: Int!) {
    deleteMapObject(id: $id) {
      id
    }
  }
`;
