import React from "react";
import { Link } from "react-router-dom";
import { Text } from "~/shared/components/Text";
import { CompilationEditPage } from "~/shared/routes";
import { Compilations } from "~/shared/stores/compilations";
import { Column } from "../types";

export const getColumns = (): Column[] => {
  return [
    {
      id: "id",
      label: <Text>ID</Text>
    },
    {
      id: "title",
      label: <Text>Title</Text>,
      render: (value, row) => {
        return (
          <Link
            className='text-green-500 hover:text-green-700 w-full block'
            to={`${CompilationEditPage.replace(":id", `${row.id}`)}`}
          >
            {value as string}
          </Link>
        );
      }
    },
    {
      id: "heading",
      label: <Text>Heading</Text>,
      render: (value) => <Text>{value as string}</Text>
    },
    {
      id: "whereUseLink",
      label: <Text>Used in section</Text>,
      render: (value) => {
        const { href: to, title } = value as Compilations["whereUseLink"];
        return (
          <Link className='text-green-500 hover:text-green-700 w-full block' to={to}>
            <Text component='span'>{title}</Text>
          </Link>
        );
      }
    }
  ];
};
