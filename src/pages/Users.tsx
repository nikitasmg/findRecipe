import React from "react";
import UsersTable from "~/modules/UsersTable/UsersTable";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { useUsersStore } from "~stores/users";

export const Users: React.FC = () => {
  const { count, isLoading } = useUsersStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle title='Users' countTitle='count users' isLoading={isLoading} count={count} />
      <UsersTable />
    </PageWrapper>
  );
};
