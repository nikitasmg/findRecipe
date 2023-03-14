import { gql } from "graphql-request";

export const EventsFragment = gql`
  fragment allEventsFields on Event {
    id
    name
    description
    published
    imageUrl
    place
    start
    end
    created_at
    updated_at
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
    organizers {
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

  query eventById($id: Int!) {
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

export const UpdateEventPublished = gql`
  mutation UpdateEventPublished($id: Int!, $published: Boolean!) {
    upsertEvent(input: { id: $id, published: $published }) {
      id
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
  mutation deleteEvent($id: Int!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;
