import React from "react";
import { Text } from "~/shared/components/Text";
import { Column } from "../types";

export const getColumns = (): Column[] => {
  return [
    {
      id: "id",
      label: <Text>ID</Text>
    }
  ];
};
