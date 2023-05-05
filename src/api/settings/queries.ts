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

  query settingById($id: Int!) {
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
    $address_en: String
    $email: String
    $emailPress: String
    $send_email_notify: String
    $content_editor: String
    $vk: String
    $facebook: String
    $telegram: String
    $instagram: String
    $whatsapp: String
  ) {
    phone: upsertSetting(input: { id: 1, name: "phone", value: $phone }) {
      ...allSettingsFields
    }
    email: upsertSetting(input: { id: 2, name: "email", value: $email }) {
      ...allSettingsFields
    }
    emailPress: upsertSetting(input: { id: 3, name: "emailPress", value: $emailPress }) {
      ...allSettingsFields
    }
    address: upsertSetting(input: { id: 4, name: "address", value: $address }) {
      ...allSettingsFields
    }
    schedule: upsertSetting(input: { id: 5, name: "schedule", value: $schedule }) {
      ...allSettingsFields
    }

    send_email_notify: upsertSetting(
      input: { id: 6, name: "send_email_notify", value: $send_email_notify }
    ) {
      ...allSettingsFields
    }

    content_editor: upsertSetting(
      input: { id: 7, name: "content_editor", value: $content_editor }
    ) {
      ...allSettingsFields
    }

    vk: upsertSetting(input: { id: 8, name: "vk", value: $vk }) {
      ...allSettingsFields
    }
    facebook: upsertSetting(input: { id: 9, name: "facebook", value: $facebook }) {
      ...allSettingsFields
    }
    telegram: upsertSetting(input: { id: 10, name: "telegram", value: $telegram }) {
      ...allSettingsFields
    }
    instagram: upsertSetting(input: { id: 11, name: "instagram", value: $instagram }) {
      ...allSettingsFields
    }
    whatsapp: upsertSetting(input: { id: 12, name: "whatsapp", value: $whatsapp }) {
      ...allSettingsFields
    }
    address_en: upsertSetting(input: { id: 13, name: "address_en", value: $address_en }) {
      ...allSettingsFields
    }
  }
`;
