import { ButtonProps } from "@mui/material";
import React from "react";
import { Button } from "../Button";
import { SaveIcon } from "../Icons";

type Props = ButtonProps & {
  formName?: string;
};

export const SaveButton: React.FC<Props> = ({ formName, ...props }) => {
  return (
    <Button
      startIcon={<SaveIcon />}
      type='submit'
      variant='contained'
      color='primary'
      form={formName}
      {...props}
    >
      Save
    </Button>
  );
};
