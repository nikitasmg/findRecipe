import { gql } from "graphql-request";

export const ProjectsFragment = gql`
  fragment allProjectsFields on Project {
    id
    knowledge_field_id
    knowledge_field {
      id
      name
      sort
    }
    contest_id
    contest {
      id
      name
      number
      status
      deadline
      date
      created_at
      updated_at
    }
    number
    name
    slug
    leader
    leader_rank
    organization
    information
    annotation
    plan_results
    publications
    result_annotation
    year
    meta {
      title
      description
      auto_title
      auto_description
    }
    seo {
      id
      title
      description
    }
    created_at
    updated_at
  }
`;

export const ProjectById = gql`
  ${ProjectsFragment}

  query projectById($id: Int!) {
    projectById(id: $id) {
      ...allProjectsFields
    }
  }
`;

export const Projects = gql`
  ${ProjectsFragment}

  query projects(
    $orderBy: [QueryProjectsOrderByRelationOrderByClause!]
    $filter: [FilterByClause!]
    $first: Int = 30
    $page: Int
  ) {
    projects(orderBy: $orderBy, filter: $filter, first: $first, page: $page) {
      paginatorInfo {
        lastPage
        total
        perPage
      }
      data {
        ...allProjectsFields
      }
    }
  }
`;

export const CreateProject = gql`
  ${ProjectsFragment}

  mutation createProject($input: ProjectInput!) {
    upsertProject(input: $input) {
      ...allProjectsFields
    }
  }
`;

export const UpdateProject = gql`
  ${ProjectsFragment}

  mutation updateProject($input: ProjectInput!) {
    upsertProject(input: $input) {
      ...allProjectsFields
    }
  }
`;

export const DeleteProject = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
