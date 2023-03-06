import { gql } from "graphql-request";

export const ContentEditorKey = gql`
  query contentEditorKey {
    settingById(id: 7) {
      value
    }
  }
`;
