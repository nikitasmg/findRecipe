import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDeletePurchaseMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { PurchasesDetailsForm } from "~/modules/PurchasesDetailsForm";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { Panel } from "~/shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useLang } from "~/shared/hooks/useLang";
import { usePurchasesStore } from "~stores/purchases";

export const PurchasesEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleGoBack = useNavigationBack();

  const isEdit = Number.isInteger(Number(id));

  const { lang, setLang } = useLang();

  const client = useGraphqlClient();

  const { isSaveLoading } = usePurchasesStore((state) => ({
    isSaveLoading: state.isSaveLoading
  }));

  const { mutateAsync: deletePurchase } = useDeletePurchaseMutation(client, {
    onSuccess: handleGoBack
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deletePurchase({ id: Number(id) });
  };

  return (
    <PageWrapper>
      <Panel>
        <Box className='flex flex-col gap-6 items-center'>
          <DetailsHead
            title={isEdit ? "Purchase editing" : "Purchase creating"}
            onBackClick={handleGoBack}
            onRemove={isEdit ? handleDelete : undefined}
            onLangChange={setLang}
            isLoading={isSaveLoading}
            formName='purchasesForm'
          />
          <PurchasesDetailsForm id={Number(id)} lang={lang} formName='purchasesForm' />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
