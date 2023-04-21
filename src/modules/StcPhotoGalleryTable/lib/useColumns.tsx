import React from "react";
import { Link } from "react-router-dom";
import { Column } from "~/modules/NewsTable/types";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { StcPhotoGalleryPageEdit } from "~/shared/routes";
import { ActiveOrder } from "~/shared/types/ActiveOrder";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const { getClickHandler, getActiveProps } = useSortProps(handleOrderClick, activeOrder);

  return [
    {
      id: "id",
      label: (
        <TableHeadCell
          title='ID'
          cellId='id'
          onSortClick={getClickHandler("id")}
          sortProps={getActiveProps("id")}
        />
      ),
      align: "center"
    },

    {
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      style: { minWidth: 50 },
      render: (value, row) => (
        <img
          className='w-[50px] h-auto'
          loading='lazy'
          src={(value as string) ?? ""}
          alt={row.name as string}
        />
      )
    },

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
            to={`${StcPhotoGalleryPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.length > 100
              ? (value as string)?.slice(0, 100).concat("...")
              : (value as string)}
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
        width: "50%",
        minWidth: "300px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-all"
      },
      render: (value, row) => (
        <Link
          className='transition-all'
          to={`${StcPhotoGalleryPageEdit.replace(":id", row.id as string)}`}
        >
          {(value as string)?.length > 100
            ? (value as string)?.slice(0, 100).concat("...")
            : (value as string)}
        </Link>
      )
    }
  ];
};
