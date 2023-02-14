import { gql } from "graphql-request";

export const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const Logout = gql`
  mutation Logout {
    logout {
      id
    }
  }
`;
