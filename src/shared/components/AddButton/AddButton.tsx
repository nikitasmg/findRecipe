import React from "react";
import { Add } from "@mui/icons-material";
import { LinkButton } from "~shared/components/LinkButton";
import { ButtonProps } from "@mui/material";

export const AddButton: React.FC<ButtonProps> = (props) => {
  return (
    <LinkButton {...props} variant='contained' startIcon={<Add fontSize='large' />}>
      Add
    </LinkButton>
  );
};
