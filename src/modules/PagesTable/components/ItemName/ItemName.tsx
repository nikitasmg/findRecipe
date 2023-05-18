import { Typography } from "@mui/material";
import React from "react";
import { Link } from "~/shared/components/Link";
import { Text } from "~/shared/components/Text";
import { PagesEdit } from "~/shared/routes";

type Props = { id: number; name: string; slug: string };

export const ItemName: React.FC<Props> = ({ id, name, slug }) => {
  return (
    <Typography component='p' variant='h6'>
      {id}.&nbsp;
      <Link className='hover:underline' to={`${PagesEdit.replace(":slug", slug)}`}>
        <Text component='span' variant='h6'>
          {name}
        </Text>
      </Link>
    </Typography>
  );
};
