import { gql } from "graphql-request";

export const ProjectsFragment = gql`
  fragment allProjectsFields on Project {
    id
    knowledge_field_id
    knowledge_field {
      id
      name
      name_en
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
    name_en
    slug
    leader
    leader_en
    leader_rank
    leader_rank_en
    organization
    organization_en
    annotation
    annotation_en
    plan_results
    plan_results_en
    publications
    publications_en
    result_annotation
    result_annotation_en
    result_usage
    result_usage_en
    year
    grnti_number
    status_text
    status_text_en
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
