import { gql } from "graphql-request";

export const PartnerFragment = gql`
  fragment allPartnerFields on Partner {
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

export const PartnerById = gql`
  ${PartnerFragment}

  query partnerById($id: Int!) {
    partnerById(id: $id) {
      ...allPartnerFields
    }
  }
`;

export const Partners = gql`
  ${PartnerFragment}

  query partners($orderBy: [OrderByClause!]) {
    partners(orderBy: $orderBy) {
      ...allPartnerFields
    }
  }
`;

export const CreatePartner = gql`
  ${PartnerFragment}

  mutation createPartner($input: PartnerInput!) {
    createPartner: upsertPartner(input: $input) {
      ...allPartnerFields
    }
  }
`;

export const UpdatePartner = gql`
  ${PartnerFragment}

  mutation updatePartner($input: PartnerInput!) {
    upsertPartner(input: $input) {
      ...allPartnerFields
    }
  }
`;

export const DeletePartner = gql`
  mutation deletePartner($id: Int!) {
    deletePartner(id: $id) {
      id
    }
  }
`;
