import React from "react";
import { Switch } from "@mui/material";
import { useUpdateVacancyPublishedMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { VacanciesPageEdit } from "~/shared/routes";
import { formatDescriptionForTable } from "~/shared/lib/formatDescriptionForTable";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const client = useGraphqlClient();

  const { mutateAsync: updatePublished } = useUpdateVacancyPublishedMutation(client);

  const { getClickHandler, getActiveProps } = useSortProps(handleOrderClick, activeOrder);

  return [
    {
      id: "name",
      label: (
        <TableHeadCell
          title='Title'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${VacanciesPageEdit.replace(":id", row.id as string)}`}
          >
            {value as string}
          </Link>
        );
      }
    },

    {
      id: "description",
      label: (
        <TableHeadCell
          title='Description'
          cellId='description'
          onSortClick={getClickHandler("description")}
          sortProps={getActiveProps("description")}
        />
      ),
      style: {
        width: "350px"
      },
      format: formatDescriptionForTable
    },

    {
      id: "published",
      label: (
        <TableHeadCell
          title='Published'
          align='center'
          cellId='published'
          onSortClick={getClickHandler("published")}
          sortProps={getActiveProps("published")}
        />
      ),
      style: {
        width: "140px"
      },
      align: "center",
      render: (value, row) => {
        return (
          <Switch
            aria-label='switch-published'
            checked={!!value}
            onChange={(event) => {
              updatePublished({ id: Number(row.id), published: event.target.checked });
              row.published = !row.published;
            }}
          />
        );
      }
    }
  ];
};
