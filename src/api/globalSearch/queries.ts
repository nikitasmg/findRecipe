import { gql } from "graphql-request";

export const SearchFragment = gql`
  fragment allSearchFields on SearchResult {
    contests {
      id
      name
    }
    events {
      id
      name
    }
    news {
      id
      name
    }
    organizers {
      id
      name
    }
    partners {
      id
      name
    }
    projects {
      id
      name
    }
    purchases {
      id
      name
    }
    reports {
      id
      name
    }
    vacancies {
      id
      name
    }
  }
`;

export const GlobalSearch = gql`
  ${SearchFragment}

  query search(query: String!, limit: Int) {
    search(query: $query, limit: $limit) {
      ...allSearchFields
    }
  }
`;
