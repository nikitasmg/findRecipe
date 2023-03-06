import { FormHelperText } from "@mui/material";
import React from "react";
import { Text } from "~/shared/components/Text";

type Props = {
  id: string;
  text?: string;
  error?: string;
};

export const HelperText: React.FC<Props> = ({ error, id, text = "" }) => {
  return (
    <FormHelperText className='ml-0 test-xs' error={!!error} id={id}>
      <Text component='span' className='text-sm'>
        {error ?? text}
      </Text>
    </FormHelperText>
  );
};
