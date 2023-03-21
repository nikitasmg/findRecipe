import clsx from "clsx";
import { MuiTelInput, MuiTelInputProps } from "mui-tel-input";
import React from "react";
import styles from "./PhoneInput.module.css";

export const PhoneInput: React.FC<MuiTelInputProps> = ({ className, ...props }) => {
  return (
    <MuiTelInput
      className={clsx(className, styles.telInput)}
      defaultCountry='RU'
      disableDropdown
      onlyCountries={["RU"]}
      size='small'
      fullWidth
      inputProps={{
        maxlength: 16
      }}
      {...props}
    />
  );
};
