import { gql } from "graphql-request";

export const Upload = gql`
  mutation upload($file: Upload!) {
    upload(file: $file)
  }
`;
