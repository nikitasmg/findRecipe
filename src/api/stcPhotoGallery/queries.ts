import { gql } from "graphql-request";

export const StcPhotoGalleryFragment = gql`
  fragment allStcPhotoGalleryFields on StcPhotoGallery {
    id
    name
    name_en
    description
    description_en
    sort
    image {
        id
        url
    }
    imageUrl
  }
`;

export const stcPhotoGalleryById = gql`
  ${StcPhotoGalleryFragment}

  query stcPhotoGalleryById($id: Int!) {
    stcPhotoGalleryById(id: $id) {
      ...allStcPhotoGalleryFields
    }
  }
`;

export const stcPhotoGalleries = gql`
  ${StcPhotoGalleryFragment}

  query stcPhotoGalleries($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    stcPhotoGalleries(orderBy: $orderBy, filter: $filter) {
      ...allStcPhotoGalleryFields
    }
  }
`;

export const CreateStcPhotoGallery = gql`
  ${StcPhotoGalleryFragment}

  mutation createStcPhotoGallery($input: StcPhotoGalleryInput!) {
    createStcPhotoGallery: upsertStcPhotoGallery(input: $input) {
      ...allStcPhotoGalleryFields
    }
  }
`;

export const UpdateStcPhotoGallery = gql`
  ${StcPhotoGalleryFragment}

  mutation updateStcPhotoGallery($input: StcPhotoGalleryInput!) {
    upsertStcPhotoGallery(input: $input) {
      ...allStcPhotoGalleryFields
    }
  }
`;

export const DeleteStcPhotoGallery = gql`
  mutation deleteStcPhotoGallery($id: Int!) {
    deleteStcPhotoGallery(id: $id) {
      id
    }
  }
`;
