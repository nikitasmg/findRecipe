import React from "react";
import { Input, Typography } from "@mui/material";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Languages } from "~/shared/types/Languages";
import { Column } from "../types";

export const useColumns = (lang: Languages): Column[] => {
  const nameId = lang !== "ru" ? "name_en" : "name";

  return [
    {
      id: nameId,
      label: <TableHeadCell title='Value' cellId={nameId} />,
      style: {
        minWidth: "55%",
        paddingLeft: 10
      },
      render: (value, _, editOptions) => {
        if (!editOptions) {
          return <Typography>{value as string}</Typography>;
        }

        return (
          <Input
            name={nameId}
            onChange={editOptions.handleChange}
            fullWidth
            defaultValue={value as string}
          />
        );
      }
    }
  ];
};
