import { gql } from "graphql-request";

export const OrganizerFragment = gql`
  fragment allOrganizerFields on Organizer {
    id
    name
    imageUrl
    image {
      id
      url
    }
    created_at
  }
`;

export const OrganizerById = gql`
  ${OrganizerFragment}

  query organizerById($id: Int!) {
    organizerById(id: $id) {
      ...allOrganizerFields
    }
  }
`;

export const Organizers = gql`
  ${OrganizerFragment}

  query organizers($orderBy: [OrderByClause!]) {
    organizers(orderBy: $orderBy) {
      ...allOrganizerFields
    }
  }
`;

export const CreateOrganizer = gql`
  ${OrganizerFragment}

  mutation createOrganizer($input: OrganizerInput!) {
    upsertOrganizer(input: $input) {
      ...allOrganizerFields
    }
  }
`;

export const UpdateOrganizer = gql`
  ${OrganizerFragment}

  mutation updateOrganizer($input: OrganizerInput!) {
    upsertOrganizer(input: $input) {
      ...allOrganizerFields
    }
  }
`;

export const DeleteOrganizer = gql`
  mutation deleteOrganizer($id: Int!) {
    deleteOrganizer(id: $id) {
      id
    }
  }
`;
