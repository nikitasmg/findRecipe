import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../Text";

const languages = ["en", "ru"];

export const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl className='w-fit'>
      <InputLabel id='select-language'>
        <Text>Language</Text>
      </InputLabel>
      <Select
        labelId='select-language'
        id='select-language'
        className='flex'
        value={i18n.language}
        label={<Text>Language</Text>}
        defaultValue={"en"}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            <Text>{lang}</Text>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
