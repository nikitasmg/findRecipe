import { gql } from "graphql-request";

export const VacanciesFragment = gql`
  fragment allVacanciesFields on Vacancy {
    id
    name
    description
    sort
    published
  }
`;

export const VacancyById = gql`
  ${VacanciesFragment}

  query vacancyById($id: Int!) {
    vacancyById(id: $id) {
      ...allVacanciesFields
    }
  }
`;

export const Vacancies = gql`
  ${VacanciesFragment}

  query vacancies($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    vacancies(orderBy: $orderBy, filter: $filter) {
      ...allVacanciesFields
    }
  }
`;

export const UpdateVacancyPublished = gql`
  mutation UpdateVacancyPublished($id: Int!, $published: Boolean!) {
    upsertVacancy(input: { id: $id, published: $published }) {
      id
    }
  }
`;

export const CreateVacancy = gql`
  ${VacanciesFragment}

  mutation createVacancy($input: VacancyInput!) {
    upsertVacancy(input: $input) {
      ...allVacanciesFields
    }
  }
`;

export const UpdateVacancy = gql`
  ${VacanciesFragment}

  mutation updateVacancy($input: VacancyInput!) {
    upsertVacancy(input: $input) {
      ...allVacanciesFields
    }
  }
`;

export const DeleteVacancy = gql`
  mutation deleteVacancy($id: Int!) {
    deleteVacancy(id: $id) {
      id
    }
  }
`;
