import React, { ChangeEvent, useState } from "react";
import { Box, Button, TextField, TextFieldProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./NumericInput.module.css";

type Props = {
  max?: number;
  min?: number;
  value?: number;
} & TextFieldProps;

export const NumericInput: React.FC<Props> = ({
  max = Infinity,
  min,
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(initialValue ?? min ?? "");

  const handleAdd = () => {
    setValue((v) => Math.min(max, +v + 1));
  };

  const handleRemove = () => {
    setValue((v) => (Number.isInteger(min) ? Math.max(min as number, +v - 1) : +v - 1));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value);

    if (numericValue > max || (min && numericValue < min)) {
      return;
    }

    onChange?.(e);
    setValue(e.target.value);
  };

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
          value,
          endAdornment: (
            <Button onClick={handleAdd} className={styles["text-field__button"]} size='small'>
              <AddIcon />
            </Button>
          ),
          startAdornment: (
            <Button onClick={handleRemove} className={styles["text-field__button"]} size='small'>
              <RemoveIcon />
            </Button>
          ),
          ...props.InputProps
        }}
      />
    </Box>
  );
};
