import { gql } from "graphql-request";

export const EventsFragment = gql`
  fragment allEventsFields on Event {
    id
    name
    description
    published
    imageUrl
    image {
      id
      url
    }
    partners {
      id
      name
      imageUrl
      image {
        id
        url
      }
    }
    documents {
      id
      url
      user_name
      sort
    }
  }
`;

export const EventById = gql`
  ${EventsFragment}

  query eventById($id: ID!) {
    eventById(id: $id) {
      ...allEventsFields
    }
  }
`;

export const Events = gql`
  ${EventsFragment}

  query events(
    $orderBy: [OrderByClause!]
    $filter: [FilterByClause!]
    $first: Int = 30
    $page: Int
  ) {
    events(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
      paginatorInfo {
        lastPage
        total
        perPage
      }
      data {
        ...allEventsFields
      }
    }
  }
`;

export const CreateEvent = gql`
  ${EventsFragment}

  mutation createEvent($input: EventInput!) {
    upsertEvent(input: $input) {
      ...allEventsFields
    }
  }
`;

export const UpdateEvent = gql`
  ${EventsFragment}

  mutation updateEvent($input: EventInput!) {
    upsertEvent(input: $input) {
      ...allEventsFields
    }
  }
`;

export const DeleteEvent = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;
