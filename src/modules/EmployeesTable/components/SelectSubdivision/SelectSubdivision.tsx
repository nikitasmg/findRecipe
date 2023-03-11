import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Text } from "~shared/components/Text";
import { Subdivision, useUpdateEmployeeSubdivisionMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";

interface ISelectSubdivision {
  employeeId: string;
  value: Subdivision;
  subdivisions: Subdivision[];
}

export const SelectSubdivision: React.FC<ISelectSubdivision> = ({
  subdivisions,
  employeeId,
  value
}) => {
  const [subdivision, setSubdivision] = useState(value?.id);

  const client = useGraphqlClient();

  const { mutateAsync: updateSubdivision } = useUpdateEmployeeSubdivisionMutation(client);

  const handleChange = (event: SelectChangeEvent) => {
    setSubdivision(Number(event.target.value));
  };

  useEffect(() => {
    setSubdivision(value?.id);
  }, [value]);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Select
          id='subdivision-select'
          value={String(subdivision)}
          onChange={handleChange}
          size='small'
        >
          <MenuItem key={"empty"} value={""}>
            <Text>Not selected</Text>
          </MenuItem>
          {subdivisions?.map((subdivision) => (
            <MenuItem
              key={subdivision.id}
              value={subdivision.id}
              onClick={() =>
                updateSubdivision({ id: Number(employeeId), subdivisionId: subdivision.id })
              }
            >
              {subdivision.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
