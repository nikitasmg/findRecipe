import React from "react";
import { Link } from "~/shared/components/Link";
import { Text } from "~/shared/components/Text";
import { CompilationEditPage } from "~/shared/routes";
import { Compilations } from "~/shared/stores/compilations";
import { Column } from "../types";

export const getColumns = (): Column[] => {
  return [
    {
      id: "id",
      label: <Text>ID</Text>,
      style: { width: "10%" },
      align: "center",
      className: "text-grayLight"
    },
    {
      id: "heading",
      label: <Text>Heading</Text>,
      style: { width: "30%", paddingLeft: 8 },
      render: (value, row) => (
        <Link className='w-full block' to={`${CompilationEditPage.replace(":id", `${row.id}`)}`}>
          <Text component='span'>{value as string}</Text>
        </Link>
      )
    },
    {
      id: "whereUseLink",
      label: <Text>Used in section</Text>,
      style: { width: "50%", paddingLeft: 8 },
      render: (value) => {
        const { href: to, title } = value as Compilations["whereUseLink"];
        return (
          <Link className='w-full block' to={to}>
            <Text component='span'>{title}</Text>
          </Link>
        );
      }
    }
  ];
};
