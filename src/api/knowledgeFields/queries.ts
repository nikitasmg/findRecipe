import { gql } from "graphql-request";

export const KnowledgeFieldsFragment = gql`
  fragment allKnowledgeAreasFields on KnowledgeField {
    id
    name
    name_en
    sort
  }
`;

export const KnowledgeFieldById = gql`
  ${KnowledgeFieldsFragment}

  query knowledgeFieldById($id: Int!) {
    knowledgeFieldById(id: $id) {
      ...allKnowledgeAreasFields
    }
  }
`;

export const KnowledgeFields = gql`
  ${KnowledgeFieldsFragment}

  query knowledgeFields($orderBy: [OrderByClause!]) {
    knowledgeFields(orderBy: $orderBy) {
      ...allKnowledgeAreasFields
    }
  }
`;

export const CreateKnowledgeField = gql`
  ${KnowledgeFieldsFragment}

  mutation createKnowledgeField($sort: Int!, $name: String!, $name_en: String) {
    createKnowledgeField: upsertKnowledgeField(
      input: { sort: $sort, name: $name, name_en: $name_en }
    ) {
      ...allKnowledgeAreasFields
    }
  }
`;

export const UpdateKnowledgeField = gql`
  ${KnowledgeFieldsFragment}

  mutation updateKnowledgeField($id: Int!, $sort: Int!, $name: String!, $name_en: String) {
    upsertKnowledgeField(input: { id: $id, sort: $sort, name: $name, name_en: $name_en }) {
      ...allKnowledgeAreasFields
    }
  }
`;

export const DeleteKnowledgeField = gql`
  mutation deleteKnowledgeField($id: Int!) {
    deleteKnowledgeField(id: $id) {
      sort
      name
    }
  }
`;
