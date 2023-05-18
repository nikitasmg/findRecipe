import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteEventMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { EventsDetailsForm } from "~/modules/EventsDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useLang } from "~/shared/hooks/useLang";
import { useEventsStore } from "~stores/events";

export const EventsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const handleGoBack = useNavigationBack();

  const { isSaveLoading } = useEventsStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: deleteNews } = useDeleteEventMutation(client, { onSuccess: handleGoBack });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteNews({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "Events editing" : "Events creating"}
            onBackClick={handleGoBack}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
            formName='eventsForm'
            isLoading={isSaveLoading}
          />
          <EventsDetailsForm id={Number(id)} lang={lang} formName='eventsForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
