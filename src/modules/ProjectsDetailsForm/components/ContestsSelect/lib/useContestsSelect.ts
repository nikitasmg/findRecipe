import { SyntheticEvent, useEffect, useState } from "react";
import { Contest, useContestByIdQuery, useContestsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";

export const useContestsSelect = (initValue = 0, onFormChange: (event: number) => void) => {
  const [value, setValue] = useState<Contest | null>(null);
  const [options, setOptions] = useState<Contest[]>([]);
  const [contestsPage, setContestsPage] = useState<number>(1);

  const client = useGraphqlClient();

  const { data: contest } = useContestByIdQuery(
    client,
    { id: initValue },
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

  const isExistContest = !!options?.find((item) => item.id === initValue);

  const handleChange = (event: SyntheticEvent, newValue: unknown) => {
    const eventTarget = event.target as unknown as Contest;

    onFormChange(Number(eventTarget.id));
    setValue(newValue as Contest);
  };

  const handleScroll = (event: SyntheticEvent) => {
    const node = event.currentTarget;
    const position = node.scrollTop + node.clientHeight;
    const isNextPage =
      contentsPaginatorInfo &&
      contestsPage < contentsPaginatorInfo.lastPage &&
      node.scrollHeight - position <= 1;

    if (isNextPage) {
      setContestsPage(contestsPage + 1);
    }
  };

  useEffect(() => {
    if (currentContest) {
      setValue(currentContest as Contest);
      !isExistContest && setOptions([currentContest as Contest, ...options]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentContest, isExistContest]);

  useEffect(() => {
    if (contests) {
      const newContests = contests?.filter((item) => item.id !== options[0]?.id);

      setOptions([...options, ...(newContests as Contest[])]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contests]);

  return {
    value,
    handleChange,
    options,
    handleScroll,
    isLoading
  };
};
