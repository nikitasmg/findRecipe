import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeleteReportMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { ReportsPageRoute } from "~shared/routes";
import { useNavigationBack } from "~shared/hooks/useBackClick";
import { ReportsDetailsForm } from "~/modules/ReportsDetailsForm";
import { useLang } from "~/shared/hooks/useLang";

export const ReportsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { lang, setLang } = useLang();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const client = useGraphqlClient();

  const { mutateAsync: remove } = useDeleteReportMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    remove({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='p-4'>
          <Box className='flex flex-col gap-6 items-center'>
            <DetailsHead
              title={isEdit ? "Reports editing" : "Reports creating"}
              backHref={ReportsPageRoute}
              onRemove={isEdit ? handleDelete : undefined}
              onLangChange={setLang}
            />
            <ReportsDetailsForm id={Number(id)} lang={lang} />
          </Box>
        </Box>
      </Panel>
    </PageWrapper>
  );
};
