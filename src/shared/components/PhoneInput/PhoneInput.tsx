import React, { ChangeEvent, ReactNode } from "react";
import InputMask, { Props } from "react-input-mask";
import { TextField } from "@mui/material";

interface PhoneInputProps {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string | ReactNode;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, label }) => {
  const children = (() => (
    <TextField label={label} fullWidth size='small' />
  )) as unknown as Props["children"];

  return (
    <InputMask mask='+7 (999) 999-99-99' maskChar='' value={value} onChange={onChange}>
      {children}
    </InputMask>
  );
};
