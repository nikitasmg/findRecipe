import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ProfileNavigation } from "~/shared/components/ProfileNavigation";
import { Text } from "~/shared/components/Text";
import { PageTitle } from "~shared/components/PageTitle/PageTitle";

export const Profile: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4'>Profile</Text>
      </PageTitle>
      <ProfileNavigation />
    </PageWrapper>
  );
};
