import { ButtonProps } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "../Button";

export const SaveButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button startIcon={<SaveIcon />} type='submit' variant='outlined' size='small' {...props}>
      Save
    </Button>
  );
};
