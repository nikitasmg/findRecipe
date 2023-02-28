import { gql } from "graphql-request";

export const SettingsFragment = gql`
  fragment allSettingsFields on Setting {
    id
    name
    value
  }
`;

export const SettingById = gql`
  ${SettingsFragment}

  query settingById($id: ID!) {
    settingById(id: $id) {
      ...allSettingsFields
    }
  }
`;

export const SettingByName = gql`
  ${SettingsFragment}

  query settingByName($name: String!) {
    settingByName(name: $name) {
      ...allSettingsFields
    }
  }
`;

export const Settings = gql`
  ${SettingsFragment}

  query settings($orderBy: [OrderByClause!], $filter: [FilterByClause!]) {
    settings(orderBy: $orderBy, filter: $filter) {
      ...allSettingsFields
    }
  }
`;

export const UpdateSettings = gql`
  ${SettingsFragment}

  mutation updateSettings(
    $schedule: String
    $phone: String
    $address: String
    $email: String
    $emailPress: String
  ) {
    schedule: upsertSetting(input: { id: "1", name: "phone", value: $phone }) {
      ...allSettingsFields
    }
    phone: upsertSetting(input: { id: "2", name: "email", value: $email }) {
      ...allSettingsFields
    }
    address: upsertSetting(input: { id: "3", name: "emailPress", value: $emailPress }) {
      ...allSettingsFields
    }
    email: upsertSetting(input: { id: "4", name: "address", value: $address }) {
      ...allSettingsFields
    }
    emailPress: upsertSetting(input: { id: "5", name: "schedule", value: $schedule }) {
      ...allSettingsFields
    }
  }
`;
