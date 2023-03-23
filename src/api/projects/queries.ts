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
    annotation
    plan_results
    publications
    result_annotation
    result_usage
    year
    grnti_number
    status_text
    deadline
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
    createProject: upsertProject(input: $input) {
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
