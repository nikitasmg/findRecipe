import React from "react";
import { Text } from "~/shared/components/Text";
import { Column } from "../types";
import { formatDate } from "~/shared/lib/formatDate";

export const getColumns = (): Column[] => {
  return [
    {
      id: "id",
      label: <Text>ID</Text>
    },

    {
      id: "name",
      label: <Text>Name</Text>,
      minWidth: 80
    },

    {
      id: "email",
      label: <Text>Email</Text>,
      minWidth: 80
    },

    {
      id: "email_verified_at",
      label: <Text>Email verified at</Text>,
      minWidth: 80,
      format: formatDate
    }
  ];
};
