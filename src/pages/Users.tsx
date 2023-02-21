import { Box } from "@mui/material";
import React, { useState } from "react";
import { UsersTable } from "~/modules/UsersTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";

export const Users: React.FC = () => {
  const [usersCount, setUsersCount] = useState(0);

  return (
    <Box className='!flex flex-col h-full'>
      <PageTitle>
        <Text className='px-4' component='p'>
          Users
        </Text>
        <Text className='text-gray-600' component='span'>
          count users
        </Text>
        &nbsp;
        <Text className='text-gray-600'>{`${usersCount}`}</Text>
      </PageTitle>
      <UsersTable onUsersCountChange={setUsersCount} />
    </Box>
  );
};
