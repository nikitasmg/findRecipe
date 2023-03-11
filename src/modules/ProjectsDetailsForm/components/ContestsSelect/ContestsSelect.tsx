import React, { Fragment, useEffect, useState } from "react";
import { Text } from "~shared/components/Text";
import { Autocomplete, Box, CircularProgress, MenuItem, TextField } from "@mui/material";
import { Contest, useContestByIdQuery, useContestsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";

interface IContestsSelect {
  onChange: (...event: any[]) => void;
  value?: number;
}

export const ContestsSelect: React.FC<IContestsSelect> = ({ value, onChange }) => {
  const [currentValue, setCurrentValue] = useState<Contest | null>(null);

  const [currentOptions, setCurrentOptions] = useState<Contest[]>([]);
  const [contestsPage, setContestsPage] = useState<number>(1);

  const client = useGraphqlClient();

  const { data: contest } = useContestByIdQuery(
    client,
    { id: value || 0 },
    { refetchOnMount: "always" }
  );

  const { data: contestsData, isLoading } = useContestsQuery(
    client,
    { page: contestsPage },
    {
      refetchOnMount: "always"
    }
  );

  const contests = contestsData?.contests?.data;
  const contentsPaginatorInfo = contestsData?.contests?.paginatorInfo;

  const currentContest = contest?.contestById;

  const isExistContest = !!currentOptions?.find((item) => item.id === value);

  const handleScroll = (event: any) => {
    const node = event.currentTarget;
    const position = node.scrollTop + node.clientHeight;

    if (
      contentsPaginatorInfo &&
      contestsPage < contentsPaginatorInfo.lastPage &&
      node.scrollHeight - position <= 1
    ) {
      setContestsPage(contestsPage + 1);
    }
  };

  useEffect(() => {
    if (currentContest) {
      setCurrentValue(currentContest as Contest);
      !isExistContest && setCurrentOptions([currentContest as Contest, ...currentOptions]);
    }
  }, [currentContest, isExistContest]);

  useEffect(() => {
    if (contests) {
      const newContests = contests.filter((item) => item.id !== currentOptions[0]?.id);

      setCurrentOptions([...currentOptions, ...(newContests as Contest[])]);
    }
  }, [contests]);

  return (
    <Autocomplete
      value={currentValue}
      onChange={(event: any, newValue) => {
        onChange(Number(event.target.id));
        setCurrentValue(newValue as Contest);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={currentOptions}
      getOptionLabel={(option) => option && option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          name='contest'
          id='contest'
          variant='outlined'
          label={<Text>Contest</Text>}
          InputLabelProps={{
            shrink: true
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <Fragment key={`${option.id}`}>
            <MenuItem {...props} id={`${option.id}`}>
              {option.name}
            </MenuItem>
            {option.id === currentOptions[currentOptions.length - 1].id && isLoading && (
              <Box className='flex w-full justify-center items-center'>
                <CircularProgress />
              </Box>
            )}
          </Fragment>
        );
      }}
      ListboxProps={{
        onScroll: handleScroll,
        style: { overflowX: "hidden" }
      }}
    />
  );
};
