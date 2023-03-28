// eslint-disable-next-line no-comments/disallowComments
/* eslint-disable xss/no-mixed-html */
import React, { ChangeEvent } from "react";
import { Box, TextField, TextFieldProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "../Button";
import styles from "./NumericInput.module.css";

type Props = {
  max?: number | string;
  min?: number | string;
  value?: number;
} & TextFieldProps;

export const NumericInput: React.FC<Props> = ({
  max = Infinity,
  min = 0,
  value = 0,
  onChange,
  name,
  ...props
}) => {
  const handleAdd = () => {
    onChange?.({
      target: {
        value: Math.min(+max, +(value || 0) + 1),
        name: name ?? ""
      }
    } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleRemove = () => {
    onChange?.({
      target: {
        value: String(
          Number.isInteger(min) ? Math.max(min as number, +(value || 0) - 1) : +(value || 0) - 1
        ),
        name: name ?? ""
      }
    } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (numericValue > max || (Number.isInteger(min) && numericValue < min)) {
      return;
    }

    onChange?.(e);
  };

  const buttonColor = props.error ? "error" : "primary";

  return (
    <Box>
      <TextField
        variant='outlined'
        className={styles["text-field"]}
        size='small'
        onChange={handleChange}
        {...props}
        InputProps={{
          inputMode: "numeric",
          value: isNaN(value) ? 0 : value,
          endAdornment: (
            <Button
              color={buttonColor}
              onClick={handleAdd}
              className={styles["text-field__button"]}
              size='small'
            >
              <AddIcon />
            </Button>
          ),
          startAdornment: (
            <Button
              color={buttonColor}
              onClick={handleRemove}
              className={styles["text-field__button"]}
              size='small'
            >
              <RemoveIcon />
            </Button>
          ),
          ...props.InputProps
        }}
      />
    </Box>
  );
};
